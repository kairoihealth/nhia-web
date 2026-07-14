import {
  Box,
  Typography,
  CircularProgress,
  Card,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleComplaint } from "../../services/general";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import { StatusInfoCard } from "../State/StateSingleComplaint";

const DetailItem = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography
      variant="caption"
      sx={{
        fontWeight: 500,
        color: "text.secondary",
      }}
    >
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color: "#1B1C1E", fontWeight: 500 }}>
      {value || "N/A"}
    </Typography>
  </Box>
);

DetailItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

const statusColors = {
  closed: { backgroundColor: "#E8F5E9", color: "#1B5E20" },
  active: { backgroundColor: "#E3F2FD", color: "#0D47A1" },
  pending: { backgroundColor: "#FFF8E1", color: "#FF8F00" },
  escalated: { backgroundColor: "#FFEBEE", color: "#C62828" },
  default: { backgroundColor: "#F5F5F5", color: "#616161" },
};

const priorityColors = {
  low: { backgroundColor: "#E3F2FD", color: "#0D47A1" },
  medium: { backgroundColor: "#FFF8E1", color: "#FF8F00" },
  high: { backgroundColor: "#FFEBEE", color: "#C62828" },
  urgent: { backgroundColor: "#FFEBEE", color: "#C62828" },
  default: { backgroundColor: "#F5F5F5", color: "#616161" },
};

const getStatusChip = (status) => {
  const statusLower = status?.toLowerCase();
  const colors = statusColors[statusLower] || statusColors.default;
  return (
    <Chip
      label={status || "Unknown"}
      size="small"
      sx={{ backgroundColor: colors.backgroundColor, color: colors.color }}
    />
  );
};

const getPriorityChip = (priority) => {
  const priorityLower = priority?.toLowerCase();
  const colors = priorityColors[priorityLower] || priorityColors.default;
  return (
    <Chip
      label={priority || "N/A"}
      size="small"
      sx={{ backgroundColor: colors.backgroundColor, color: colors.color }}
    />
  );
};

const EnrolleeSingleComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: complaint,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["singleComplaint", id],
    queryFn: () => getSingleComplaint(id),
  });

  const [description, additionalInfo] = (complaint?.description || "").split(
    "\n\nAdditional Information:\n",
  );

  const assignedOfficerName =
    complaint?.assigned_to && complaint?.assigned_officer_code;

  const resolutionDate = complaint?.resolution_date;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "red",
        }}
      >
        <Typography>Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "#1B5E20", textTransform: "none", p: 0 }}
      >
        Back to Complaints
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* Left Column */}
        <Box sx={{ width: { xs: "100%", md: "calc(74% - 12px)" } }}>
          <Card
            sx={{
              p: { xs: 2, md: 2.5 },
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.04)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "16px" }}
                >
                  {complaint?.case_id}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    textTransform: "capitalize",
                    fontSize: "13px",
                  }}
                >
                  {getStatusChip(complaint?.status)}
                  {getPriorityChip(complaint?.priority)}
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {`Filed ${new Date(complaint?.created_at).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  },
                )} · Against ${complaint?.complaint_against} · ${complaint?.state?.name} State`}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Complaint Details
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/enrollee/complaint/${id}/thread`)}
                  sx={{
                    fontSize: "14px",
                    textTransform: "none",
                    borderColor: "#1B5E20",
                    color: "#1B5E20",
                    "&:hover": { borderColor: "#1B5E20" },
                  }}
                >
                  View Thread
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/enrollee/complaint/${id}/reply`)}
                  sx={{
                    fontSize: "14px",
                    textTransform: "none",
                    backgroundColor: "#1B5E20",
                    "&:hover": { backgroundColor: "#1B5E20" },
                  }}
                >
                  Respond
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: { sm: "flex" }, gap: { sm: 3 } }}>
              <Box sx={{ flex: 1 }}>
                <DetailItem
                  label="Date of Incident"
                  value={new Date(complaint?.incident_date).toLocaleDateString(
                    "en-GB",
                    { day: "2-digit", month: "short", year: "numeric" },
                  )}
                />
                <DetailItem
                  label="Complaint Type"
                  value={complaint?.complaint_type}
                />
                <DetailItem
                  label="Complaint Against"
                  value={complaint?.complaint_against}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <DetailItem
                  label="Complaint Category"
                  value={complaint?.complaint_category}
                />
                <DetailItem
                  label="Programme"
                  value={complaint?.nhia_programme}
                />
                <DetailItem label="State" value={complaint?.state?.name} />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#1B1C1E", mb: 1 }}
              >
                Description
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  p: 1.5,
                  backgroundColor: "#F5F5F5",
                  borderRadius: "8px",
                  // border: "1px solid #E0E0E0",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                }}
              >
                {description}
              </Typography>
            </Box>

            {additionalInfo && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#1B1C1E", mb: 1 }}
                >
                  Additional Information
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    p: 1.5,
                    backgroundColor: "#F5F5F5",
                    borderRadius: "8px",
                    // border: "1px solid #E0E0E0",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6,
                  }}
                >
                  {additionalInfo}
                </Typography>
              </Box>
            )}
          </Card>
        </Box>

        {/* Right Column */}
        <Box sx={{ width: { xs: "100%", md: "calc(26% - 12px)" } }}>
          <StatusInfoCard
            status={complaint?.status}
            priority={complaint?.priority}
            state={complaint?.state?.name}
            assignedTo={assignedOfficerName}
            resolutionDate={resolutionDate}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EnrolleeSingleComplaint;
