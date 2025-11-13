import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import {
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVerySatisfied,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  rateComplaint,
  updateComplaintStatus,
} from "../../../services/general";
import {
  useHandleError,
  useHandleSuccess,
} from "../../../hooks/useToastHandler";

const ratingIcons = [
  {
    icon: <SentimentVeryDissatisfied sx={{ height: "44px", width: "44px" }} />,
    label: "Very bad",
  },
  {
    icon: <SentimentDissatisfied sx={{ height: "44px", width: "44px" }} />,
    label: "Bad",
  },
  {
    icon: <SentimentNeutral sx={{ height: "44px", width: "44px" }} />,
    label: "Neutral",
  },
  {
    icon: <SentimentSatisfied sx={{ height: "44px", width: "44px" }} />,
    label: "Good",
  },
  {
    icon: <SentimentVerySatisfied sx={{ height: "44px", width: "44px" }} />,
    label: "Very good",
  },
];

const getFeedbackMessage = (complaint) => {
  switch (complaint?.status?.toLowerCase()) {
    case "pending":
      return "Your complaint is currently pending and will be reviewed shortly.";
    case "active":
      return "Your complaint is actively being investigated. We will provide updates as soon as they are available.";
    case "closed":
      return `Dear ${complaint?.firstname || ""}, your complaint against ${
        complaint?.complaint_against === "HMO"
          ? complaint?.hmo?.name
          : complaint?.complaint_against === "Provider"
          ? complaint?.provider?.name
          : complaint?.complaint_against === "Enrollee"
          ? complaint?.enrollee || ""
          : "the NHIA"
      } has been closed. We hope the resolution was satisfactory. Best Regards.`;
    case "escalated":
      return "This complaint has been escalated for further review. The headquarters will handle it from here.";
    default:
      return "The status of your complaint is being updated.";
  }
};

const ComplaintStatusModal = ({ open, onClose, complaint }) => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();
  const [isUpdating, setIsUpdating] = useState(false);
  const [view, setView] = useState("details"); // 'details', 'rating', 'escalate'
  const [rating, setRating] = useState(0);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setView("details");
      setRating(0);
    }, 300);
  };

  const handleRate = async () => {
    setIsUpdating(true);
    try {
      let res = await rateComplaint({
        id: complaint.id,
        payload: {
          rating: rating,
        },
      });

      handleSuccess(res.data?.message || "Complaint escalated successfully");
      handleClose();
    } catch (error) {
      handleError("Failed to send response:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEscalate = async () => {
    setIsUpdating(true);
    try {
      let res = await updateComplaintStatus({
        id: complaint.id,
        payload: {
          status: "escalated",
          feedback: "User escalated the complaint",
        },
      });

      handleSuccess(res.data?.message || "Your response has been submitted");
      handleClose();
    } catch (error) {
      handleError("Failed to send response:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const renderContent = () => {
    switch (view) {
      case "rating":
        return (
          <>
            <DialogTitle sx={{ textAlign: "center" }}>
              Rate your complaint resolution
            </DialogTitle>
            <DialogContent>
              <Stack direction="row" spacing={2} justifyContent="center" my={3}>
                {ratingIcons.map((item, index) => (
                  <div key={index}>
                    <IconButton
                      key={index}
                      onClick={() => setRating(index + 1)}
                      color={rating >= index + 1 ? "success" : "default"}
                      sx={{
                        transform:
                          rating === index + 1 ? "scale(1.2)" : "scale(1)",
                        transition: "transform 0.2s",
                      }}
                    >
                      {item.icon}
                    </IconButton>
                    {(index === 0 || index === 4) && (
                      <Typography
                        variant="caption"
                        align="center"
                        display="block"
                      >
                        {item.label}
                      </Typography>
                    )}
                  </div>
                ))}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
              <Button
                variant="contained"
                sx={{
                  width: "270px",
                  height: "48px",
                  borderRadius: "8px",
                  py: 1.5,
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  textTransform: "capitalize",
                  backgroundColor: "#038F3E",
                  "&:hover": { backgroundColor: "#038F3E" },
                }}
                onClick={handleRate}
                disabled={rating === 0}
              >
                Submit Rating
              </Button>
            </DialogActions>
          </>
        );
      case "escalate":
        return (
          <>
            <DialogContent
              sx={{ borderBottom: "none", backgroundColor: "#F5F5F5" }}
              dividers
            >
              <Typography
                sx={{
                  backgroundColor: "#fff",
                  padding: "14px 20px",
                  borderRadius: "8px",
                  marginBottom: "30px",
                }}
              >
                <span style={{ color: "#595959", fontWeight: "300" }}>
                  Case Status:
                </span>{" "}
                <Typography
                  component="span"
                  sx={{
                    textTransform: "capitalize",
                    color: "#1B1C1E",
                    fontWeight: "500",
                  }}
                >
                  {complaint.status}
                </Typography>
              </Typography>
              <Box
              // sx={{
              //   backgroundColor: "#fff",
              //   padding: "14px 20px",
              //   borderRadius: "8px",
              // }}
              >
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", color: "#1B1C1E", mb: 1 }}
                  gutterBottom
                >
                  Are you sure you want to escalate this complaint?
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#595959" }}>
                  Once escalated, this complaint will be forwarded to the
                  headquarters for further review.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: "center",
                pb: 3,
                backgroundColor: "#F5F5F5",
              }}
            >
              <Button
                sx={{
                  //   width: "270px",
                  //   height: "48px",
                  borderRadius: "8px",
                  py: 1.5,
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  textTransform: "capitalize",
                  borderColor: "#038F3E",
                  color: "#038F3E",
                }}
                onClick={() => setView("details")}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "8px",
                  py: 1.5,
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  textTransform: "capitalize",
                  backgroundColor: "#038F3E",
                  marginLeft: "14px",
                  "&:hover": { backgroundColor: "#038F3E" },
                }}
                onClick={handleEscalate}
                loading={isUpdating}
              >
                Escalate
              </Button>
            </DialogActions>
          </>
        );
      default: // 'details'
        return (
          <>
            <DialogContent
              dividers
              sx={{ borderBottom: "none", backgroundColor: "#F5F5F5" }}
            >
              <Typography
                sx={{
                  backgroundColor: "#fff",
                  padding: "14px 20px",
                  borderRadius: "8px",
                  marginBottom: "30px",
                }}
              >
                <span style={{ color: "#595959", fontWeight: "300" }}>
                  Case Status:
                </span>{" "}
                <Typography
                  component="span"
                  sx={{
                    textTransform: "capitalize",
                    color: "#1B1C1E",
                    fontWeight: "500",
                  }}
                >
                  {complaint.status}
                </Typography>
              </Typography>
              <Typography
                sx={{
                  backgroundColor: "#fff",
                  padding: "14px 20px",
                  borderRadius: "8px",
                }}
              >
                <span
                  style={{
                    color: "#595959",
                    fontWeight: "300",
                    marginBottom: "10px",
                    display: "block",
                  }}
                >
                  Feedback Message:
                </span>{" "}
                <Typography>{getFeedbackMessage(complaint)}</Typography>
              </Typography>
            </DialogContent>
            <DialogActions
              sx={{
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                backgroundColor: "#F5F5F5",
              }}
            >
              {complaint.status === "closed" && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "#595959", fontWeight: "300" }}
                  >
                    Satisfied with the resolution?
                  </Typography>
                  <Button
                    onClick={() => setView("rating")}
                    size="small"
                    sx={{ color: "#038F3E", fontWeight: "500" }}
                  >
                    Rate Response
                  </Button>
                </Box>
              )}
              {complaint.status === "closed" && (
                <Box
                  mt={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "#595959", fontWeight: "300" }}
                  >
                    Not satisfied with the resolution?
                  </Typography>
                  <Button
                    onClick={() => setView("escalate")}
                    size="small"
                    sx={{ color: "#038F3E", fontWeight: "500" }}
                  >
                    Escalate
                  </Button>
                </Box>
              )}
            </DialogActions>
          </>
        );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      {complaint && (
        <>
          <DialogTitle
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#20201E",
              color: "#fff",
            }}
          >
            {complaint.case_id} - {complaint.complaint_type}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          {renderContent()}
        </>
      )}
    </Dialog>
  );
};

ComplaintStatusModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  complaint: PropTypes.shape({
    id: PropTypes.string,
    case_id: PropTypes.string,
    complaint_type: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default ComplaintStatusModal;
