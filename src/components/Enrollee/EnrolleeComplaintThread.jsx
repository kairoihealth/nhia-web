import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  Card,
  CardMedia,
  Chip,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "@tanstack/react-query";
import {
  getComplaintResponses,
  getSingleComplaint,
} from "../../services/general";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { isImage } from "../../utils/general";
import { RoleBadge } from "../State/StateComplaintThread";
import { StatusChip } from "../../shared/StatusChips";

const EnrolleeComplaintThread = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: complaint,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["complaints", id],
    queryFn: () => getSingleComplaint(id),
  });

  const {
    data: responses,
    isLoading: isLoadingg,
    // isError: isResponsesError,
  } = useQuery({
    queryKey: ["complaintResponses", id],
    queryFn: () => getComplaintResponses(id),
  });

  // const { nhiaResponses, respondentResponses, enrolleeResponses } =
  //   useMemo(() => {
  //     const allResponses = responses || [];
  //     return {
  //       nhiaResponses: allResponses.filter(
  //         (r) =>
  //           r.response_by?.role === "Admin" ||
  //           r.response_by?.role === "StateAdmin",
  //       ),
  //       respondentResponses: allResponses.filter(
  //         (r) =>
  //           r.response_by?.role === "Provider" || r.response_by?.role === "HMO",
  //       ),
  //       enrolleeResponses: allResponses.filter(
  //         (r) => r.response_by?.role === "Enrollee",
  //       ),
  //     };
  //   }, [responses]);

  const allSortedResponses = [...(responses || [])].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  );

  const handleReply = (to) => {
    navigate(`/enrollee/complaint/${complaint?.id}/reply`, {
      state: { thread: id, to },
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
    <Box sx={{ p: { xs: 0, md: 1 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/enrollee/complaint/${id}`)}
        sx={{ mb: 1.5, color: "#1B5E20", textTransform: "none", p: 0 }}
      >
        Back to Complaint
      </Button>

      {/*Head*/}
      <Box>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "32.4px",
            color: "#1B1C1E",
          }}
        >
          Complaint thread
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
              boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
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
                    navigate(`/enrollee/complaint/${complaint?.id}`, {
                      state: { complaint: complaint?.id },
                    })
                  }
                  sx={{
                    cursor: "pointer",
                    color: "#1B5E20",
                    fontSize: "13px",
                    mt: "4px",
                  }}
                >
                  View Complain details
                </Typography>
              </Box>
              <Box>{<StatusChip status={complaint?.status} />}</Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/*complaint details*/}
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 500,
                  lineHeight: "18px",
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
                  mt: 2,
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
                {/* Attachments for main complaint */}
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
                  complaint.evidences.length > 0 ? (
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      {complaint.evidences.map((file, index) => (
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
                                window.open(file.document, "_blank");
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
                      sx={{ mt: 1 }}
                      color="#595959"
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
                      fontSize: "15px",
                      fontWeight: 500,
                      lineHeight: "18px",
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
              boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
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
              Case responses
            </Typography>
            <Divider sx={{ my: 1 }} />
            {allSortedResponses?.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No responses yet.
              </Typography>
            ) : (
              <Stack divider={<Divider sx={{ my: 2 }} />} spacing={0}>
                {allSortedResponses.map((response) => {
                  const isEnrollee = response.response_by?.role === "Enrollee";
                  // const responderName = isEnrollee
                  //   ? "Enrollee (You)"
                  //   : `${response.response_by.firstname} ${response.response_by.lastname}`;

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
                      <Box>
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
                        {!isEnrollee && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mt: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                color: "#292D32",
                                textDecoration: "underline",
                              }}
                            >
                              {response.response_by.email}
                            </Typography>
                            <Divider
                              orientation="vertical"
                              sx={{
                                height: "15px",
                                backgroundColor: "#000000",
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                color: "#000000",
                              }}
                            >
                              {response.response_by.phone}
                            </Typography>
                          </Box>
                        )}
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
                                          window.open(file.document, "_blank");
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
                  onClick={() => handleReply("NHIA")}
                >
                  Reply NHIA
                </Button>
                {complaint?.complaint_against === "NHIA" ? null : (
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
                    Reply Respondent
                  </Button>
                )}
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
                  Reply All
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
  );
};

export default EnrolleeComplaintThread;
