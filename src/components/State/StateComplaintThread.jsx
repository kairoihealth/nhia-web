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
  Chip,
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
import PropTypes from "prop-types";

const statusColors = {
  closed: { backgroundColor: "#E8F5E9", color: "#1B5E20" },
  active: { backgroundColor: "#E3F2FD", color: "#0D47A1" },
  pending: { backgroundColor: "#FFF8E1", color: "#FF8F00" },
  escalated: { backgroundColor: "#FFEBEE", color: "#C62828" },
  default: { backgroundColor: "#F5F5F5", color: "#616161" },
};

const getStatusChip = (status) => {
  const statusLower = status?.toLowerCase();
  const colors = statusColors[statusLower] || statusColors.default;
  return (
    <Chip
      label={status || "Unknown"}
      size="small"
      sx={{
        backgroundColor: colors.backgroundColor,
        color: colors.color,
        textTransform: "capitalize",
      }}
    />
  );
};

const roleColors = {
  hmo: { backgroundColor: "#E3F2FD", color: "#0D47A1" },
  provider: { backgroundColor: "#E3F2FD", color: "#0D47A1" },
  enrollee: { backgroundColor: "#F5F5F5", color: "#212121" },
  stateadmin: { backgroundColor: "#E8F5E9", color: "#1B5E20" },
  admin: { backgroundColor: "#E8F5E9", color: "#1B5E20" },
  default: { backgroundColor: "#F5F5F5", color: "#616161" },
};

export const RoleBadge = ({ role = "" }) => {
  const roleKey = role.toLowerCase();
  const colors = roleColors[roleKey] || roleColors.default;
  return (
    <Chip
      label={role === "StateAdmin" || role === "Admin" ? "Officer" : role}
      size="small"
      sx={{
        backgroundColor: colors.backgroundColor,
        color: colors.color,
        textTransform: "uppercase",
        fontSize: "10px",
        fontWeight: 600,
      }}
    />
  );
};

RoleBadge.propTypes = {
  role: PropTypes.string,
};

const StateComplaintThreadPage = () => {
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const location = useLocation();
  const thread = location?.state?.thread;
  const { id } = useParams();

  const navigate = useNavigate();

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
  const handleUpdateStatus = async (status) => {
    setIsUpdating(true);
    try {
      let res = await updateComplaintStatus({
        id: thread,
        payload: { status, feedback: status },
      });

      refetch();
      handleSuccess(res.data?.message || "Complaint updated successfully");
    } catch (error) {
      handleError("Failed to send response:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReply = (to) => {
    navigate(`/stateadmin/complaint/${complaint?.id}/reply`, {
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
    <Box sx={{ p: 1 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "#1B5E20", textTransform: "none", p: 0 }}
      >
        Back to Complaint
      </Button>
      {/*Head*/}
      <Box>
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 500,
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
                p: { xs: 2, md: 4 },
                borderRadius: "12px",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.04)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
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
                      navigate(`/stateadmin/complaint/${complaint?.id}`, {
                        state: { complaint: complaint?.id },
                      })
                    }
                    sx={{ cursor: "pointer", color: "#071C42", mt: "4px" }}
                  >
                    View Complain details
                  </Typography>
                </Box>
                <Box>
                  {getStatusChip(complaint?.status)}
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
                        onChange={(e) => {
                          handleUpdateStatus(e.target.value);
                        }}
                      >
                        <option value="">Change status</option>
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="escalated">Escalated</option>
                      </select>
                    )}
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

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
                    mt: 3,
                    mb: "10px",
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
                        fontSize: "16px",
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
            </Card>

            {/*Complaint responses*/}
            <Card
              sx={{
                mt: 3,
                p: { xs: 2, md: 4 },
                borderRadius: "12px",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.04)",
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

                    const officerTag = response.response_by?.officer_code
                      ? ` ${response.response_by?.officer_code}`
                      : "";

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
                                    complaint?.provider?.name
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
                              p: 1.5,
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
                                          alt={`Response attachment ${index + 1}`}
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
                                            color: "#EFF3F9",
                                            "&:hover": {
                                              backgroundColor:
                                                "rgba(0,0,0,0.7)",
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
                                  sx={{ mt: 1 }}
                                  color="#595959"
                                >
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
                  width: { xs: "70%", md: "auto" },
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
                  width: { xs: "70%", md: "auto" },
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
                  width: { xs: "70%", md: "auto" },
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
    </Box>
  );
};

const StateComplaintThread = WithAuthorization(StateComplaintThreadPage, [
  "can_view_all_complaints",
  "can_view_complaint_details",
  "can_respond_to_complaints",
]);

export default StateComplaintThread;
