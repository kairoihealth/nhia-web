import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Card,
  MenuItem,
  Divider,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  assignComplaint,
  getSingleComplaint,
  getComplaintStatusHistory,
  getComplaintAssignmentHistory,
  updateComplaintPriority,
} from "../../services/general";
import WithAuthorization from "../auth/withAuthorization";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import { useState } from "react";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { getUsers } from "../../services/central";
import { PriorityChip, StatusChip } from "../../shared/StatusChips";
import ActivityTimeline from "../../shared/ActivityTimeline";

export const DetailItem = ({ label, value, direction = "column" }) => (
  <Box
    sx={{
      mb: 2,
      display: "flex",
      flexDirection: direction,
      justifyContent: "space-between",
    }}
  >
    <Typography
      variant="caption"
      sx={{
        fontWeight: 500,
        color: "text.secondary",
      }}
    >
      {label}
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: "#1B1C1E", fontWeight: 500, fontSize: "13px" }}
    >
      {value || "N/A"}
    </Typography>
  </Box>
);

DetailItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  direction: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export const StatusInfoCard = ({
  status,
  priority,
  state,
  assignedTo,
  resolutionDate,
}) => {
  const calculateDaysLeft = (date) => {
    if (!date) return "N/A";
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "Overdue";
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} left`;
  };

  return (
    <Card
      sx={{
        p: { xs: 2, lg: 2.5 },
        borderRadius: "12px",
        boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 1.5, fontSize: "14px" }}
      >
        Case Status
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <DetailItem
        label="Status"
        value={<StatusChip status={status} />}
        direction="row"
      />
      <DetailItem
        label="Priority"
        value={<PriorityChip priority={priority} />}
        direction="row"
      />
      {state && (
        <DetailItem label="State" value={state || "N/A"} direction="row" />
      )}
      <DetailItem
        label="Assigned Officer"
        value={assignedTo || "Not Assigned"}
        direction="row"
      />
      <DetailItem
        label="Resolution Target"
        value={calculateDaysLeft(resolutionDate)}
        direction="row"
      />
    </Card>
  );
};

StatusInfoCard.propTypes = {
  status: PropTypes.string,
  priority: PropTypes.string,
  state: PropTypes.string,
  assignedTo: PropTypes.string,
  resolutionDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
};

const StateSingleComplaintPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const [assignedTo, setAssignedTo] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [priority, setPriority] = useState("");
  const [isUpdatingPriority, setIsUpdatingPriority] = useState(false);

  const {
    data: complaint,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["complaints", id],
    queryFn: () => getSingleComplaint(id),
  });

  const { data: statusHistory } = useQuery({
    queryKey: ["complaintStatusHistory", id],
    queryFn: () => getComplaintStatusHistory(id),
    enabled: !!id,
  });

  const { data: assignmentHistory } = useQuery({
    queryKey: ["complaintAssignmentHistory", id],
    queryFn: () => getComplaintAssignmentHistory(id),
    enabled: !!id,
  });

  const { data: officers } = useQuery({
    queryKey: ["stateOfficers", complaint?.state?.id],
    queryFn: () =>
      getUsers({
        state: complaint.state.id,
        role: "StateAdmin",
      }),
    enabled: !!complaint?.state?.id,
  });

  const buttonText =
    complaint?.status === "resolved"
      ? "View Resolution"
      : complaint?.status === "closed"
        ? "View Thread"
        : "Resolve Complaint";

  const handleCompliant = () => {
    navigate(`/stateadmin/complaint/${complaint?.id}/thread`, {
      state: { thread: complaint?.id },
    });
  };

  const handleAssignComplaint = async () => {
    if (!assignedTo) {
      handleError("Please select an officer to assign.");
      return;
    }
    setIsAssigning(true);
    try {
      await assignComplaint({ id, payload: { assigned_to: assignedTo } });
      handleSuccess("Complaint assigned successfully!");
      refetch();
    } catch (error) {
      handleError(error, "Failed to assign complaint.");
    } finally {
      setIsAssigning(false);
    }
  };

  const handleUpdatePriority = async () => {
    if (!priority) {
      handleError("Please select a priority level.");
      return;
    }
    setIsUpdatingPriority(true);
    try {
      await updateComplaintPriority({
        id,
        payload: { priority: priority.toLowerCase() },
      });
      handleSuccess("Complaint priority updated successfully!");
      refetch();
    } catch (error) {
      handleError(error, "Failed to update priority.");
    } finally {
      setIsUpdatingPriority(false);
    }
  };

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
    <Box sx={{ p: { xs: 0, sm: 1 } }}>
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
              p: { xs: 2, lg: 2.5 },
              borderRadius: "12px",
              boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
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
                  <StatusChip status={complaint?.status} />
                  <PriorityChip priority={complaint?.priority} />
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
              <Button
                variant="contained"
                onClick={handleCompliant}
                sx={{
                  fontSize: "14px",
                  textTransform: "none",
                  backgroundColor: "#1B5E20",
                  "&:hover": { backgroundColor: "#1B5E20" },
                }}
              >
                {buttonText}
              </Button>
            </Box>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "#1B5E20", mb: 2 }}
            >
              Complainant&apos;s Details
            </Typography>
            <Box sx={{ display: { sm: "flex" }, gap: { sm: 3 } }}>
              <Box sx={{ flex: 1 }}>
                <DetailItem
                  label="Complainant's Name"
                  value={`${complaint?.firstname || "-"} ${complaint?.lastname || "-"}`}
                />
                <DetailItem
                  label="Complainant's Email"
                  value={complaint?.email}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <DetailItem
                  label="Complainant's Address"
                  value={complaint?.contact_address}
                />
                <DetailItem
                  label="Complainant's Phone"
                  value={complaint?.phone}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "#1B5E20", mb: 2 }}
            >
              Incident Details
            </Typography>
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
                <DetailItem
                  label="Name of Respondent"
                  value={
                    complaint?.respondent ||
                    complaint?.provider?.name ||
                    complaint?.hmo?.name
                  }
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <DetailItem
                  label="Time of Incident"
                  value={complaint?.incident_time}
                />
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
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                }}
              >
                {complaint?.description}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <ActivityTimeline
              statusHistory={statusHistory}
              assignmentHistory={assignmentHistory}
              complaint={complaint}
            />
          </Card>
        </Box>

        {/* Right Column */}
        <Box sx={{ width: { xs: "100%", md: "calc(26% - 12px)" } }}>
          <StatusInfoCard
            status={complaint?.status}
            priority={complaint?.priority}
            state={complaint?.state?.name}
            assignedTo={complaint?.assigned_officer_code}
            resolutionDate={complaint?.due_date}
          />

          <Card
            sx={{
              p: { xs: 2, lg: 2.5 },
              mt: 3,
              borderRadius: "12px",
              boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 1.5, fontSize: "14px" }}
            >
              Assign Complaint
            </Typography>
            <Divider sx={{ mb: 2.5 }} />
            <TextField
              select
              fullWidth
              label="Assigned Officer"
              color="success"
              value={assignedTo || complaint?.assigned_to || ""}
              onChange={(e) => setAssignedTo(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="" disabled>
                Select an officer
              </MenuItem>
              {officers?.results?.map((officer) => (
                <MenuItem key={officer.id} value={officer.id}>
                  {officer.officer_code} - {officer.state?.name}
                </MenuItem>
              ))}
            </TextField>
            <Button
              fullWidth
              variant="text"
              onClick={handleAssignComplaint}
              disabled={isAssigning}
              sx={{
                textTransform: "none",
                color: "#1B5E20",
                fontSize: "14px",
                // borderColor: "#1B5E20",
                backgroundColor: "#E8F5E9",
                "&:hover": { backgroundColor: "#C8E6C9", color: "#1B5E20" },
              }}
            >
              {isAssigning ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Assign"
              )}
            </Button>
          </Card>

          <Card
            sx={{
              p: { xs: 2, lg: 2.5 },
              mt: 3,
              borderRadius: "12px",
              boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 1.5, fontSize: "14px" }}
            >
              Update Priority
            </Typography>
            <Divider sx={{ mb: 2.5 }} />
            <TextField
              select
              fullWidth
              label="Select Priority"
              color="success"
              value={priority || complaint?.priority || ""}
              onChange={(e) => setPriority(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
            </TextField>
            <Button
              fullWidth
              variant="text"
              onClick={handleUpdatePriority}
              disabled={isUpdatingPriority}
              sx={{
                textTransform: "none",
                color: "#1B5E20",
                fontSize: "14px",
                backgroundColor: "#E8F5E9",
                "&:hover": { backgroundColor: "#C8E6C9", color: "#1B5E20" },
              }}
            >
              {isUpdatingPriority ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update"
              )}
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

const StateSingleComplaint = WithAuthorization(StateSingleComplaintPage, [
  "can_view_complaint_details",
  "can_respond_to_complaints",
]);

export default StateSingleComplaint;
