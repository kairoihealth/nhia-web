import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Divider,
  Stack,
  IconButton,
  Typography,
  Modal,
  TextField,
  Fade,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getComplaintResponses,
  getSingleComplaint,
  updateComplaintStatus,
} from "../../services/general";
import { isImage } from "../../utils/general";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import WithAuthorization from "../auth/withAuthorization";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RoleBadge } from "../State/StateComplaintThread";
import FormCardHeader from "../../views/enrolees/ComplaintForm/FormCardHeader";
import { StatusChip } from "../../shared/StatusChips";

const CentralComplaintThreadPage = () => {
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const location = useLocation();
  const thread = location?.state?.thread;
  const { id } = useParams();

  const navigate = useNavigate();

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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

  const {
    data: responses,
    isLoading: isLoadingg,
    //  error
  } = useQuery({
    queryKey: ["complaintResponses", id],
    queryFn: () => getComplaintResponses(id),
  });

  const allSortedResponses = useMemo(
    () =>
      [...(responses || [])].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      ),
    [responses],
  );
  const handleUpdateStatus = async (status, feedbackText) => {
    setIsUpdating(true);
    try {
      const payload = { status };
      if (status === "resolved") {
        payload.resolution_notes = feedbackText || status;
      } else {
        payload.feedback = feedbackText || status;
      }
      let res = await updateComplaintStatus({ id, payload });

      refetch();
      handleSuccess(res.data?.message || "Complaint updated successfully");
    } catch (error) {
      handleError("Failed to send response:", error);
    } finally {
      setIsUpdating(false);
      setFeedbackModalOpen(false);
      setFeedback("");
    }
  };

  const handleReply = (to) => {
    navigate(`/admin/complaint/${complaint?.id}/reply`, {
      state: {
        thread,
        to,
        ...(to === "Respondent" && { response: responses[0] }),
      },
    });
  };

  if (isLoading || isLoadingg) {
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
        sx={{ mb: 1, color: "#1B5E20", textTransform: "none", p: 0 }}
      >
        Back to Complaint
      </Button>
      {/*Head*/}
      <Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "32.4px",
              color: "#1B1C1E",
            }}
          >
            Complaint Thread
          </Typography>
        </Box>
        {complaint?.case_id ? (
          <>
            {/*Complaint trail*/}

            <Card
              sx={{
                mt: 2,
                p: { xs: 2, md: 2.5 },
                borderRadius: "12px",
                boxShadow:
                  "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: "15px", sm: "18px" },
                      fontWeight: 600,
                      lineHeight: "32.4px",
                      color: "#111827",
                    }}
                  >
                    {complaint?.case_id} - {complaint?.complaint_type || ""}
                  </Typography>
                  <Typography
                    role="button"
                    onClick={() =>
                      navigate(`/admin/complaint/${complaint.id}`, {
                        state: { complaint: complaint?.id },
                      })
                    }
                    sx={{
                      cursor: "pointer",
                      color: "#1B5E20",
                      mt: "4px",
                      fontSize: "13px",
                    }}
                  >
                    View Complain details
                  </Typography>
                </Box>
                <Box>
                  <StatusChip status={complaint?.status} />
                  {complaint?.status !== "closed" &&
                    complaint?.status !== "resolved" && (
                      <Box>
                        {isUpdating || isLoading ? (
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 300,
                              color: "#111827",
                              marginTop: "8px",
                            }}
                          >
                            Please wait...
                          </Typography>
                        ) : (
                          <select
                            name="status"
                            style={{
                              border: "none",
                              background: "transparent",
                              marginTop: "10px",
                              outline: "none",
                              color: "#555555",
                            }}
                            value={complaint?.status || ""}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              if (
                                newStatus === "resolved" ||
                                newStatus === "escalated"
                              ) {
                                setSelectedStatus(newStatus);
                                setFeedbackModalOpen(true);
                              } else {
                                handleUpdateStatus(newStatus);
                              }
                            }}
                          >
                            <option value="">Change status</option>
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="resolved">Resolved</option>
                            <option value="escalated">Escalated</option>
                          </select>
                        )}
                      </Box>
                    )}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    color: "#111827",
                  }}
                >
                  {complaint?.firstname || "-"} {complaint?.lastname || "-"}
                </Typography>
              </Box>

              {/*complaint details*/}
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "21.6px",
                    color: "#000000",
                    mt: 2,
                    mb: 1,
                  }}
                >
                  Complaint description
                </Typography>
                <Box
                  sx={{
                    fontSize: "14px",
                    color: "#1B1C1E",
                    p: 1.5,
                    backgroundColor: "#F5F5F5",
                    borderRadius: "8px",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6,
                  }}
                >
                  <Typography variant="body2">
                    {complaint?.description}
                  </Typography>
                  {/*attachment*/}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      mt: 3,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 500,
                        lineHeight: "21.6px",
                        color: "#000000",
                      }}
                    >
                      Attachments
                    </Typography>
                    {Array.isArray(complaint?.evidences) &&
                    complaint?.evidences.length > 0 ? (
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        {complaint?.evidences?.map((file, index) => (
                          <Card
                            key={file.id}
                            sx={{
                              position: "relative",
                              width: "149px",
                              borderRadius: 2,
                              overflow: "hidden",
                              boxShadow:
                                "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
                            }}
                          >
                            {isImage(file.document) ? (
                              <CardMedia
                                component="img"
                                sx={{
                                  width: "149px",
                                  height: "101px",
                                }}
                                image={file.document}
                                alt={`Complaint attachment ${index + 1}`}
                              />
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: 140,
                                  backgroundColor: "#f5f5f5",
                                }}
                              >
                                <InsertDriveFileIcon
                                  sx={{ fontSize: 48, color: "#d32f2f" }}
                                />
                                <Typography variant="caption">
                                  {file.name}
                                </Typography>
                              </Box>
                            )}

                            {/* Overlay Download Button */}
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 8,
                                right: 12,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "24px",
                                height: "24px",
                                borderRadius: "3px",
                                backgroundColor: "#EFF3F9",
                              }}
                            >
                              <IconButton
                                onClick={() => {
                                  window.open(file.document, "_blank");
                                  return;
                                  // setIsDownloading(file.document);
                                  // fetch(
                                  //   "https://cors-anywhere.herokuapp.com/" +
                                  //     file.document,
                                  //   {
                                  //     method: "GET",
                                  //     headers: {
                                  //       "Content-Type": "application/pdf",
                                  //     },
                                  //   }
                                  // )
                                  //   .then((response) => response.blob())
                                  //   .then((blob) => {
                                  //     // Create blob link to download
                                  //     const url = window.URL.createObjectURL(blob);
                                  //     const fileName = file.document
                                  //       .split("/")
                                  //       .pop();
                                  //     const link = document.createElement("a");

                                  //     link.href = url;
                                  //     link.setAttribute("download", fileName);

                                  //     // Append to html link element page
                                  //     document.body.appendChild(link);

                                  //     // Start download
                                  //     link.click();
                                  //     setIsDownloading(file.document);

                                  //     // Clean up and remove the link
                                  //     link.parentNode.removeChild(link);
                                  //   });
                                }}
                                sx={{
                                  color: "#EFF3F9",
                                  "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                  },
                                }}
                              >
                                <FileDownloadOutlinedIcon
                                  sx={{ color: "#1B5E20" }}
                                />
                              </IconButton>
                            </Box>
                          </Card>
                        ))}
                      </Box>
                    ) : (
                      <Typography
                        variant="body2"
                        align="left"
                        color="#595959"
                        sx={{ mt: 1 }}
                      >
                        No attachments added.
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>

              {(complaint?.status === "resolved" ||
                complaint?.status === "closed" ||
                complaint?.status === "escalated") &&
                (complaint.resolution_notes || complaint.feedback) && (
                  <Box sx={{ width: "100%", mt: 3 }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "21.6px",
                        color: "#000000",
                        mb: "10px",
                      }}
                    >
                      {complaint?.status === "resolved"
                        ? "Resolution Note"
                        : "Feedback"}
                    </Typography>
                    <Box
                      sx={{
                        fontSize: "14px",
                        color: "#1B1C1E",
                        p: 2,
                        backgroundColor: "#E8F5E9",
                        // borderRadius: "8px",
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        borderLeft: "4px solid #1B5E20",
                      }}
                    >
                      <Typography variant="body2">
                        {complaint.resolution_notes || complaint.feedback}
                      </Typography>
                    </Box>
                  </Box>
                )}
            </Card>

            {/*Complaint responses*/}
            <Card
              sx={{
                mt: 3,
                p: { xs: 2, md: 2.5 },
                borderRadius: "12px",
                boxShadow:
                  "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1B1C1E",
                }}
              >
                Case Communications
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              {allSortedResponses?.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  No responses yet.
                </Typography>
              ) : (
                <Stack divider={<Divider sx={{ my: 2 }} />} spacing={0}>
                  {allSortedResponses.map((response) => {
                    const enrolleeTag =
                      response.response_by?.role === "Enrollee"
                        ? `${response.response_by?.firstname} ${response.response_by?.lastname}`
                        : "";
                    const hmoTag =
                      response.response_by?.role === "HMO"
                        ? ` ${response.hmo_name}`
                        : "";
                    const providerTag =
                      response.response_by?.role === "Provider"
                        ? ` ${response.provider_name}`
                        : "";

                    const officerTag =
                      response.response_by?.role === "StateAdmin"
                        ? ` ${response.response_by?.officer_code}`
                        : `${response.response_by?.firstname} ${response.response_by?.lastname}`;

                    const responderName =
                      enrolleeTag || hmoTag || providerTag || officerTag;

                    return (
                      <Box key={response.id} sx={{ py: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: 600,
                              }}
                            >
                              {responderName}
                            </Typography>
                            <RoleBadge role={response.response_by?.role} />
                          </Box>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 600,
                              lineHeight: "24px",
                              color: "#111827",
                            }}
                          >
                            Sent to:{" "}
                            {response.response_recipient === "All"
                              ? "All"
                              : response.response_recipient === "Complainant"
                                ? `${complaint.firstname} ${complaint.lastname} (Complainant)`
                                : `${
                                    complaint?.hmo?.name ||
                                    complaint?.provider?.name ||
                                    complaint?.complaint_against
                                  }`}
                          </Typography>

                          <Typography variant="caption" color="text.secondary">
                            {new Date(response.created_at).toLocaleString(
                              "en-GB",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              },
                            )}
                          </Typography>
                        </Box>

                        <Box sx={{ width: "100%" }}>
                          <Box
                            sx={{
                              fontSize: "14px",
                              color: "#1B1C1E",
                              mt: 2,
                              p: { xs: 1.5, md: 2 },
                              backgroundColor: "#F5F5F5",
                              borderRadius: "8px",
                              whiteSpace: "pre-wrap",
                              lineHeight: 1.6,
                            }}
                          >
                            <Typography variant="body2">
                              {response.response}
                            </Typography>

                            {/* Attachments for each response */}
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                mt: 3,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  lineHeight: "21.6px",
                                  color: "#000000",
                                }}
                              >
                                Attachments
                              </Typography>
                              {Array.isArray(response?.docs) &&
                              response.docs.length > 0 ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 2,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {response.docs.map((file, index) => (
                                    <Card
                                      key={file.id}
                                      sx={{
                                        position: "relative",
                                        width: "149px",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        boxShadow:
                                          "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
                                      }}
                                    >
                                      {isImage(file.document) ? (
                                        <CardMedia
                                          component="img"
                                          sx={{
                                            width: "149px",
                                            height: "101px",
                                          }}
                                          image={file.document}
                                          alt={`Response attachment ${
                                            index + 1
                                          }`}
                                        />
                                      ) : (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: 140,
                                            backgroundColor: "#f5f5f5",
                                          }}
                                        >
                                          <InsertDriveFileIcon
                                            sx={{
                                              fontSize: 48,
                                              color: "#d32f2f",
                                            }}
                                          />
                                          <Typography variant="caption">
                                            {file.name || "File"}
                                          </Typography>
                                        </Box>
                                      )}

                                      <Box
                                        sx={{
                                          position: "absolute",
                                          bottom: 8,
                                          right: 12,
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          width: "24px",
                                          height: "24px",
                                          borderRadius: "3px",
                                          backgroundColor: "#EFF3F9",
                                        }}
                                      >
                                        <IconButton
                                          onClick={() => {
                                            window.open(
                                              file.document,
                                              "_blank",
                                            );
                                          }}
                                          sx={{
                                            "&:hover": {
                                              backgroundColor:
                                                "rgba(0,0,0,0.1)",
                                            },
                                          }}
                                        >
                                          <FileDownloadOutlinedIcon
                                            sx={{
                                              color: "#1B5E20",
                                              fontSize: "18px",
                                            }}
                                          />
                                        </IconButton>
                                      </Box>
                                    </Card>
                                  ))}
                                </Box>
                              ) : (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  No attachments added.
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </Card>

            {/*Button*/}
            {/*Button*/}
            {complaint?.status !== "closed" &&
              complaint?.status !== "resolved" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    my: 6,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      width: { xs: "70%", md: "20%" },
                      border: "1px solid #1B5E20",
                      color: "#1B5E20",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      textTransform: "capitalize",
                      padding: "10px 22px",
                      borderRadius: "50px",
                    }}
                    onClick={() => handleReply("Complainant")}
                  >
                    Reply complainant
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      width: { xs: "70%", md: "20%" },
                      border: "1px solid #1B5E20",
                      color: "#1B5E20",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      textTransform: "capitalize",
                      padding: "10px 22px",
                      borderRadius: "50px",
                    }}
                    onClick={() => handleReply("Respondent")}
                  >
                    Reply respondent
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      width: { xs: "70%", md: "20%" },
                      border: "1px solid #1B5E20",
                      color: "#1B5E20",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      textTransform: "capitalize",
                      padding: "10px 22px",
                      borderRadius: "50px",
                    }}
                    onClick={() => handleReply("All")}
                  >
                    Reply all
                  </Button>
                </Box>
              )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#111827",
              }}
            >
              No Complaint
              {/* <span>14/04/2024</span> */}
            </Typography>
          </Box>
        )}
      </Box>
      <Modal
        open={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-description"
        closeAfterTransition
      >
        <Fade in={feedbackModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "12px",
            }}
          >
            <FormCardHeader
              title="Provide Feedback for Status Change"
              subtitle={`Please provide a reason for changing the status to "${selectedStatus}".`}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => setFeedbackModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => handleUpdateStatus(selectedStatus, feedback)}
                disabled={isUpdating || !feedback}
                sx={{
                  ml: 2,
                  backgroundColor: "#1B5E20",
                  "&:hover": { backgroundColor: "#1B5E20" },
                }}
              >
                {isUpdating ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

const CentralComplaintThread = WithAuthorization(CentralComplaintThreadPage, [
  "can_view_all_complaints",
  "can_view_complaint_details",
  "can_respond_to_complaints",
]);

export default CentralComplaintThread;
