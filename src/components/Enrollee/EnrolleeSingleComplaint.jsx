import {
  Box,
  Typography,
  CircularProgress,
  Card,
  Button,
  Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSingleComplaint,
  getComplaintStatusHistory,
  getComplaintAssignmentHistory,
  updateComplaintStatus,
} from "../../services/general";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";
import { StatusInfoCard } from "../State/StateSingleComplaint";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { useState } from "react";
import { PriorityChip, StatusChip } from "../../shared/StatusChips";
import ActivityTimeline from "../../shared/ActivityTimeline";

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

const EnrolleeSingleComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const [isClosing, setIsClosing] = useState(false);

  const {
    data: complaint,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["singleComplaint", id],
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

  const [description, additionalInfo] = (complaint?.description || "").split(
    "\n\nAdditional Information:\n",
  );

  const assignedOfficerName =
    complaint?.assigned_to && complaint?.assigned_officer_code;

  const resolutionDate = complaint?.due_date;

  const threadButtonText =
    complaint?.status === "resolved"
      ? "View Resolution"
      : complaint?.status === "closed"
        ? "View Thread"
        : "View Thread";

  const handleCloseComplaint = async () => {
    setIsClosing(true);
    try {
      await updateComplaintStatus({
        id,
        payload: {
          status: "closed",
          feedback: "Complaint withdrawn by enrollee.",
        },
      });
      handleSuccess("Complaint has been successfully withdrawn.");
      refetch();
    } catch (error) {
      handleError(error, "Failed to withdraw complaint.");
    } finally {
      setIsClosing(false);
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
    <Box sx={{ p: { xs: 0, md: 1 } }}>
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
                  {threadButtonText}
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
                {complaint?.status !== "closed" &&
                  complaint?.status !== "resolved" && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleCloseComplaint}
                      disabled={isClosing}
                      sx={{
                        fontSize: "14px",
                        textTransform: "none",
                      }}
                    >
                      {isClosing ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Withdraw Complaint"
                      )}
                    </Button>
                  )}
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
            assignedTo={assignedOfficerName}
            resolutionDate={resolutionDate}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EnrolleeSingleComplaint;
