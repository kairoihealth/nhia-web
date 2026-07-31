import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormCardHeader from "../views/enrolees/ComplaintForm/FormCardHeader";

const formatDate = (dateString) => {
  const options = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Date(dateString)
    .toLocaleString("en-GB", options)
    .replace(",", ",");
};

const activityColors = {
  creation: "#1B5E20", // green
  assignment: "#0D47A1", // blue
  status_change: "#FF8F00", // orange
  escalation: "#C62828", // red
  default: "#616161", // grey
};

const getActorName = (user) => {
  if (!user) return "System";
  return user.officer_code || `${user.firstname} ${user.lastname}`;
};

const TimelineItem = ({ activity, isLast, complaint }) => {
  let title = "";
  let actor = "";

  switch (activity.type) {
    case "creation":
      title = "Complaint submitted";
      actor = complaint?.firstname + " " + complaint?.lastname;
      break;
    case "assignment":
      if (activity.notes) {
        title = activity.notes;
      } else if (activity.from_user) {
        title = `Re-assigned from ${getActorName(activity.from_user)} to ${getActorName(activity.to_user)}`;
      } else {
        title = `Routed to ${activity.to_user.state_name || "NHIA"} · Assigned to ${getActorName(activity.to_user)}`;
      }
      actor = getActorName(activity.assigned_by);
      break;
    case "status_change":
      if (activity.notes) {
        title = activity.notes;
      } else {
        title = `Status changed from ${activity.from_status} to ${activity.to_status}`;
      }
      actor = getActorName(activity.changed_by);
      break;
    default:
      title = "Unknown activity";
      actor = "System";
  }

  let color = activityColors[activity.type] || activityColors.default;
  if (activity.type === "status_change" && activity.to_status === "escalated") {
    color = activityColors.escalation;
  }
  if (activity.type === "status_change" && activity.to_status === "resolved") {
    color = activityColors.creation;
  }

  return (
    <Box sx={{ display: "flex", gap: 1.3, alignItems: "flex-start" }}>
      {/* Lollipop Icon */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 0.8,
        }}
      >
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
        {!isLast && (
          <Box
            sx={{
              width: "2px",
              flexGrow: 1,
              backgroundColor: "#E0E0E0",
              minHeight: "16px",
            }}
          />
        )}
      </Box>

      {/* Content */}
      <Box sx={{ pb: isLast ? 0 : 1.4, flex: 1 }}>
        <Typography
          variant="caption"
          sx={{ fontSize: "10px", color: "#6B6B6B" }}
        >
          {formatDate(activity.created_at)}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: "13px",
              fontWeight: 400,
              color: "#3D3D3D",
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {activity.reason && (
            <Tooltip title={activity.reason} placement="top" arrow>
              <IconButton size="small" sx={{ p: 0 }}>
                <InfoOutlinedIcon
                  sx={{ fontSize: "14px", color: "text.secondary" }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Typography
          variant="caption"
          sx={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#388E3C",
          }}
        >
          {actor}
        </Typography>
      </Box>
    </Box>
  );
};

TimelineItem.propTypes = {
  activity: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  complaint: PropTypes.string.isRequired,
};

const ActivityTimeline = ({ statusHistory, assignmentHistory, complaint }) => {
  const combinedHistory = complaint?.created_at
    ? [
        {
          type: "creation",
          created_at: complaint.created_at,
        },
        ...(statusHistory || []).map((item) => ({
          ...item,
          type: "status_change",
        })),
        ...(assignmentHistory || []).map((item) => ({
          ...item,
          type: "assignment",
        })),
      ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    : [];

  return (
    <Box>
      <FormCardHeader
        title="Activity Timeline"
        titleSx={{ fontSize: "16px", fontWeight: 600, mb: 2 }}
      />
      <Box>
        {combinedHistory.map((activity, index) => (
          <TimelineItem
            key={index}
            activity={activity}
            isLast={index === combinedHistory.length - 1}
            complaint={complaint}
          />
        ))}
      </Box>
    </Box>
  );
};

ActivityTimeline.propTypes = {
  statusHistory: PropTypes.arrayOf(PropTypes.object),
  assignmentHistory: PropTypes.arrayOf(PropTypes.object),
  complaint: PropTypes.object,
};

ActivityTimeline.defaultProps = {
  statusHistory: [],
  assignmentHistory: [],
  complaint: {},
};

export default ActivityTimeline;
