import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useState } from "react";
import {
  getComplaintResponses,
  getSingleComplaint,
  updateComplaintStatus,
} from "../../services/general";
import { useQuery } from "@tanstack/react-query";
import { isImage } from "../../utils/general";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";

const ProvidersComplaintThread = () => {
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const location = useLocation();
  const thread = location?.state?.thread;
  const { id: case_id } = useParams();

  const navigate = useNavigate();

  const [isDownloading, setIsDownloading] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: complaint,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["complaints", thread],
    queryFn: () => getSingleComplaint(thread),
  });

  const {
    data: responses,
    isLoading: isLoadingg,
    //  error
  } = useQuery({
    queryKey: ["complaintResponses", thread],
    queryFn: () => getComplaintResponses(thread),
  });

  const centralNhiaResponse =
    responses?.find((response) => response.response_by?.role === "Admin") || {};

  const stateNhiaResponse =
    responses?.find(
      (response) => response.response_by?.role === "StateAdmin"
    ) || {};

  const nhiaResponse = centralNhiaResponse?.response
    ? centralNhiaResponse
    : stateNhiaResponse?.response
    ? stateNhiaResponse
    : null;

  const respondentResponses = responses?.filter(
    (response) => response.response_by?.role === "Provider"
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

  const handleReply = () => {
    navigate(`/provider/complaint/${case_id}/reply`, { state: { thread } });
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
    <Box sx={{ background: "#fff", px: 4 }}>
      {/*Head*/}
      <Box>
        <Box sx={{ mt: 2 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "32.4px",
              color: "#1B1C1E",
            }}
          >
            Complaints thread
          </Typography>
        </Box>
      </Box>

      {complaint?.case_id ? (
        <>
          {/*Complaint trail*/}

          <Box sx={{ mt: 3 }}>
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
                    fontSize: "24px",
                    fontWeight: 500,
                    lineHeight: "32.4px",
                    color: "#111827",
                  }}
                >
                  {complaint?.case_id} - {complaint?.complaint_type || ""}
                </Typography>
                <Typography
                  role="button"
                  onClick={() =>
                    navigate(`/stateadmin/complaint/${complaint.case_id}`, {
                      state: { complaint: complaint?.id },
                    })
                  }
                  sx={{ cursor: "pointer", color: "#071C42", mt: "4px" }}
                >
                  View Complain details
                </Typography>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.5,
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "21.6px",
                    borderRadius: "8px",
                    textTransform: "capitalize",
                    backgroundColor:
                      complaint?.status === "pending"
                        ? "#FFF3E7"
                        : complaint?.status === "closed"
                        ? "#D6EBFF"
                        : complaint?.status === "active"
                        ? "#E8F8EE"
                        : "#FFF2F4",
                    color:
                      complaint?.status === "pending"
                        ? "#EDB378"
                        : complaint?.status === "closed"
                        ? "#4B95DD"
                        : complaint?.status === "active"
                        ? "#096F35"
                        : "#EB001B",
                  }}
                >
                  &bull; {complaint?.status || "N/A"}
                </Box>
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
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              // width: "100%",
              maxWidth: "1332px",
              mt: 4,
              px: 4,
              py: 4,
              background: "#FAFAFA",
            }}
          >
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
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
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
                  {complaint?.email}
                </Typography>
                <Divider
                  orientation="vertical"
                  sx={{ height: "15px", backgroundColor: "#000000" }}
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    color: "#000000",
                  }}
                >
                  {complaint?.phone}
                </Typography>
              </Box>
            </Box>

            {/*complaint details*/}
            <Box sx={{ width: "972px" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "21.6px",
                  color: "#000000",
                  mt: 3,
                  mb: "26px",
                }}
              >
                Complaint description
              </Typography>
              <Box
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#1B1C1E",
                  mt: 2,
                }}
              >
                <Typography>{complaint?.description}</Typography>
              </Box>
            </Box>

            {/*attachment*/}
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}
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
                          <Typography variant="caption">{file.name}</Typography>
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
                            //     const fileName = file.document.split("/").pop();
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
                          <FileDownloadOutlinedIcon sx={{ color: "#038F3E" }} />
                        </IconButton>
                      </Box>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  align="left"
                  sx={{ mt: 2 }}
                  color="#595959"
                >
                  No attachments added.
                </Typography>
              )}
            </Box>

            {/*NHIA Message trail*/}
            {nhiaResponse && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Box sx={{ width: "987px", textAlign: "center", my: 2 }}>
                  <Divider
                    sx={{
                      borderBottom: "1px dashed #000000",
                    }}
                  />
                </Box>
                <Box sx={{ width: "972px" }}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 600,
                      lineHeight: "24px",
                      color: "#111827",
                    }}
                  >
                    Message From NHIA
                  </Typography>
                  <Box
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      color: "#1B1C1E",
                      my: 2.6,
                    }}
                  >
                    <Typography>
                      {nhiaResponse?.response || "No response provided."}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: "#111827",
                      }}
                    >
                      Sent by:{" "}
                      <span>
                        {nhiaResponse?.response_by?.firstname +
                          " " +
                          nhiaResponse?.response_by?.lastname}
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: "#111827",
                      }}
                    >
                      Date:{" "}
                      <span>
                        {new Date(
                          nhiaResponse?.created_at
                        ).toLocaleDateString() || "--"}
                      </span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          {/*Complaint responses*/}
          {respondentResponses?.length ? (
            <>
              {respondentResponses?.map((t) => (
                <>
                  <Box sx={{ width: "100%", textAlign: "center", my: 3 }}>
                    <Divider
                      sx={{
                        borderBottom: "2px solid #7E7E7E",
                      }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: 500,
                      lineHeight: "32.4px",
                      color: "#071C42",
                      mb: 2,
                    }}
                  >
                    Respondent
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      // width: "1032px",
                      maxWidth: "1332px",
                      px: 4,
                      py: 4,
                      background: "#FAFAFA",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: 600,
                          lineHeight: "24px",
                          color: "#111827",
                        }}
                      >
                        {t.response_by.firstname} {t.response_by.lastname}
                      </Typography>
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
                          {t.response_by.email}
                        </Typography>
                        <Divider
                          orientation="vertical"
                          sx={{ height: "15px", backgroundColor: "#000000" }}
                        />
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 400,
                            lineHeight: "24px",
                            color: "#000000",
                          }}
                        >
                          {t.response_by.phone}
                        </Typography>
                      </Box>
                    </Box>

                    {/*complaint details*/}
                    <Box sx={{ width: "972px" }}>
                      {/* <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "21.6px",
                      color: "#000000",
                      mt: 4,
                    }}
                  >
                    Complaint description
                  </Typography> */}
                      <Box
                        sx={{
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: "24px",
                          color: "#1B1C1E",
                          mt: 2,
                        }}
                      >
                        <Typography>{t.response}</Typography>
                      </Box>
                    </Box>

                    {/*attachment*/}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        mt: 2,
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
                      {Array.isArray(t?.docs) && t?.docs.length > 0 ? (
                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                          {t?.docs?.map((file) => (
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
                                  alt={file.document}
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
                                    //     const url =
                                    //       window.URL.createObjectURL(blob);
                                    //     const fileName = file.document
                                    //       .split("/")
                                    //       .pop();
                                    //     const link =
                                    //       document.createElement("a");

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
                                  {isDownloading === file.document ? (
                                    <CircularProgress size={18} />
                                  ) : (
                                    <FileDownloadOutlinedIcon
                                      sx={{ color: "#038F3E" }}
                                    />
                                  )}
                                </IconButton>
                              </Box>
                            </Card>
                          ))}
                        </Box>
                      ) : (
                        <Typography
                          variant="body2"
                          align="left"
                          sx={{ mt: 2 }}
                          color="#595959"
                        >
                          No attachments added.
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        // width: "1032px",
                        maxWidth: "1032px",
                        mt: 2,
                      }}
                    >
                      {nhiaResponse && (
                        <>
                          {/*divider*/}
                          <Box
                            sx={{ width: "987px", textAlign: "center", my: 2 }}
                          >
                            <Divider
                              sx={{
                                borderBottom: "1px dashed #000000",
                              }}
                            />
                          </Box>
                          <Box sx={{ width: "972px" }}>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                fontWeight: 600,
                                lineHeight: "24px",
                                color: "#111827",
                              }}
                            >
                              Official Use
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 1.5,
                                mt: 2,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 1.8,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                    color: "#000000",
                                  }}
                                >
                                  Receiving Officer ( for NHIA):{" "}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                    color: "#000000",
                                  }}
                                >
                                  Signature:{" "}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                    color: "#111827",
                                  }}
                                >
                                  Date:
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 1.8,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                    color: "#000000",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: 600,
                                      lineHeight: "24px",
                                      color: "#111827",
                                    }}
                                  >
                                    {nhiaResponse?.response_by?.firstname +
                                      " " +
                                      nhiaResponse?.response_by?.lastname}
                                  </span>
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                    color: "#000000",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      lineHeight: "18.9px",
                                      color: "#038F3E",
                                    }}
                                  >
                                    {nhiaResponse?.response_by?.firstname +
                                      " " +
                                      nhiaResponse?.response_by?.lastname}
                                  </span>
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    lineHeight: "24px",
                                    color: "#111827",
                                  }}
                                >
                                  {new Date(
                                    nhiaResponse?.created_at
                                  ).toLocaleDateString() || "--"}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
                </>
              ))}
            </>
          ) : null}

          {/*Button*/}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              sx={{
                width: "20%",
                border: "1px solid #038F3E",
                color: "#038F3E",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                textTransform: "capitalize",
                padding: "12px 24px",
                borderRadius: "50px",
                mt: 8,
                mb: 6,
              }}
              onClick={handleReply}
            >
              Reply NHIA
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
  );
};

export default ProvidersComplaintThread;

// import {
//   Box,
//   Button,
//   Card,
//   CardMedia,
//   Divider,
//   IconButton,
//   Typography
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import hospital1 from "../../assets/hospital1.png";
// import hospital2 from "../../assets/hospital2.png";
// import hospital3 from "../../assets/hospital3.png";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// import { useState } from "react";

// const data = {
//   id: 1,
//   name: "John Doe",
//   email: "john@doe.com",
//   phone: "123-456-9999",
//   complaint_no: "11023",
//   complaint:
//     "I've been experiencing issues with my HMO, and my doctor hasn't seen me in over a year. I'd like to discuss my concerns and see if there's anything I can do to improve my quality of life.",
//   status: "Open",
//   attachment: [
//     { id: 1, name: "testing 1", icon: hospital1, type: "image" },
//     { id: 2, name: "testing 2", icon: hospital2, type: "image" },
//     { id: 3, name: "testing 3", icon: hospital3, type: "image" }
//   ]
// };

// const repsonseData = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@doe.com",
//     phone: "123-456-9999",
//     complaint_no: "11023",
//     complaint:
//       "I've been experiencing issues with my HMO, and my doctor hasn't seen me in over a year. I'd like to discuss my concerns and see if there's anything I can do to improve my quality of life.",
//     status: "Open",
//     attachment: [
//       { id: 1, name: "testing 1", icon: hospital1, type: "image" },
//       { id: 2, name: "testing 2", icon: hospital2, type: "image" },
//       { id: 3, name: "testing 3", icon: hospital3, type: "image" }
//     ]
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     email: "john@doe.com",
//     phone: "123-456-9999",
//     complaint_no: "11023",
//     complaint:
//       "I've been experiencing issues with my HMO, and my doctor hasn't seen me in over a year. I'd like to discuss my concerns and see if there's anything I can do to improve my quality of life.",
//     status: "Open",
//     attachment: [
//       { id: 1, name: "testing 1", icon: hospital1, type: "image" },
//       { id: 2, name: "testing 2", icon: hospital2, type: "image" },
//       { id: 3, name: "testing 3", icon: hospital3, type: "image" }
//     ]
//   }
// ];
// const ProvidersComplaintThread = () => {
//   const { id } = useParams();
//   console.log(id, "checking...");
//   const navigate = useNavigate();

//   const [isResponse] = useState(true);

//   const handleReply = () => {
//     navigate(`/provider/complaint/${id}/reply`, { state: { data } });
//   };

//   return (
//     <Box>
//       {/*Head*/}
//       <Box sx={{ px: 2 }}>
//         <Box sx={{ mt: 2 }}>
//           <Typography
//             sx={{
//               fontSize: "24px",
//               fontWeight: 500,
//               lineHeight: "32.4px",
//               color: "#1B1C1E"
//             }}
//           >
//             Complaints thread
//           </Typography>
//         </Box>
//         <Box sx={{ mt: 3 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography
//               sx={{
//                 fontSize: "24px",
//                 fontWeight: 500,
//                 lineHeight: "32.4px",
//                 color: "#111827"
//               }}
//             >
//               {data.complaint_no} - Access to services
//             </Typography>
//             <Box
//               sx={{
//                 display: "inline-block",
//                 px: 2,
//                 py: 0.5,
//                 fontSize: "16px",
//                 fontWeight: 400,
//                 lineHeight: "21.6px",
//                 borderRadius: "8px",
//                 backgroundColor:
//                   data.status === "Pending"
//                     ? "#FFF3E7"
//                     : data.status === "Resolved"
//                     ? "#D6EBFF"
//                     : "#E8F8EE",
//                 color:
//                   data.status === "Pending"
//                     ? "#EDB378"
//                     : data.status === "Resolved"
//                     ? "#4B95DD"
//                     : "#096F35"
//               }}
//             >
//               &bull; {data.status || "N/A"}
//             </Box>
//           </Box>
//           <Typography sx={{ mt: 1, cursor: "pointer" }}>
//             View Complain details
//           </Typography>
//         </Box>
//       </Box>

//       {/*Complaint trail*/}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//           width: "1032px",
//           mt: 6,
//           px: 10
//         }}
//       >
//         <Box>
//           <Typography
//             sx={{
//               fontSize: "20px",
//               fontWeight: 600,
//               lineHeight: "24px",
//               color: "#111827"
//             }}
//           >
//             {data.name}
//           </Typography>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
//             <Typography
//               sx={{
//                 fontSize: "16px",
//                 fontWeight: 400,
//                 lineHeight: "24px",
//                 color: "#292D32",
//                 textDecoration: "underline"
//               }}
//             >
//               {data.email}
//             </Typography>
//             <Divider
//               orientation="vertical"
//               sx={{ height: "15px", backgroundColor: "#000000" }}
//             />
//             <Typography
//               sx={{
//                 fontSize: "16px",
//                 fontWeight: 400,
//                 lineHeight: "24px",
//                 color: "#000000"
//               }}
//             >
//               {data.phone}
//             </Typography>
//           </Box>
//         </Box>

//         {/*complaint details*/}
//         <Box sx={{ width: "972px" }}>
//           <Typography
//             sx={{
//               fontSize: "16px",
//               fontWeight: 500,
//               lineHeight: "21.6px",
//               color: "#000000",
//               mt: 4
//             }}
//           >
//             Complaint description
//           </Typography>
//           <Box
//             sx={{
//               fontSize: "16px",
//               fontWeight: 400,
//               lineHeight: "24px",
//               color: "#1B1C1E",
//               mt: 2
//             }}
//           >
//             {data.complaint}
//           </Box>
//         </Box>

//         {/*attachment*/}
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
//           <Typography
//             sx={{
//               fontSize: "16px",
//               fontWeight: 500,
//               lineHeight: "21.6px",
//               color: "#000000"
//             }}
//           >
//             Attachments
//           </Typography>
//           {Array.isArray(data.attachment) && data.attachment.length > 0 ? (
//             <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//               {data.attachment.map((file) => (
//                 <Card
//                   key={file.id}
//                   sx={{
//                     position: "relative",
//                     width: "149px",
//                     borderRadius: 2,
//                     overflow: "hidden"
//                   }}
//                 >
//                   {file.type === "image" ? (
//                     <CardMedia
//                       component="img"
//                       sx={{
//                         width: "149px",
//                         height: "101px"
//                       }}
//                       image={file.icon}
//                       alt={file.name}
//                     />
//                   ) : (
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         height: 140,
//                         backgroundColor: "#f5f5f5"
//                       }}
//                     >
//                       <InsertDriveFileIcon
//                         sx={{ fontSize: 48, color: "#d32f2f" }}
//                       />
//                       <Typography variant="caption">{file.name}</Typography>
//                     </Box>
//                   )}

//                   {/* Overlay Download Button */}
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       bottom: 8,
//                       right: 12,
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       width: "24px",
//                       height: "24px",
//                       borderRadius: "3px",
//                       backgroundColor: "#EFF3F9"
//                     }}
//                   >
//                     <IconButton
//                       onClick={() => {}}
//                       sx={{
//                         color: "#EFF3F9",
//                         "&:hover": {
//                           backgroundColor: "rgba(0,0,0,0.7)"
//                         }
//                       }}
//                     >
//                       <FileDownloadOutlinedIcon sx={{ color: "#038F3E" }} />
//                     </IconButton>
//                   </Box>
//                 </Card>
//               ))}
//             </Box>
//           ) : (
//             <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//               No attachments available.
//             </Typography>
//           )}
//         </Box>

//         {/*divider*/}
//         <Box sx={{ width: "987px", textAlign: "center", my: 2 }}>
//           <Divider
//             sx={{
//               borderBottom: "1px dashed #000000"
//             }}
//           />
//         </Box>
//       </Box>

//       {/*Message trail*/}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//           width: "1032px",
//           mt: 2,
//           px: 10
//         }}
//       >
//         <Box sx={{ width: "972px" }}>
//           <Typography
//             sx={{
//               fontSize: "20px",
//               fontWeight: 600,
//               lineHeight: "24px",
//               color: "#111827"
//             }}
//           >
//             Message From NHIA
//           </Typography>
//           <Box
//             sx={{
//               fontSize: "16px",
//               fontWeight: 400,
//               lineHeight: "24px",
//               color: "#1B1C1E",
//               mt: 2
//             }}
//           >
//             {data.complaint}
//           </Box>
//           <Box sx={{ mt: 2 }}>
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: 400,
//                 lineHeight: "24px",
//                 color: "#111827"
//               }}
//             >
//               Sent by: <span>Abiodun Adeleke</span>
//             </Typography>
//             <Typography
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: 400,
//                 lineHeight: "24px",
//                 color: "#111827"
//               }}
//             >
//               Date: <span>14/04/2024</span>
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/*Complaint responses*/}
//       {isResponse ? (
//         <>
//           {repsonseData.map((t) => (
//             <>
//               <Box sx={{ width: "100%", textAlign: "center", my: 3 }}>
//                 <Divider
//                   sx={{
//                     borderBottom: "2px solid #7E7E7E"
//                   }}
//                 />
//               </Box>
//               <Typography
//                 sx={{
//                   fontSize: "24px",
//                   fontWeight: 500,
//                   lineHeight: "32.4px",
//                   color: "#071C42",
//                   px: 4
//                 }}
//               >
//                 Respondent
//               </Typography>

//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 2,
//                   width: "1032px",
//                   mt: 6,
//                   px: 10
//                 }}
//               >
//                 <Box>
//                   <Typography
//                     sx={{
//                       fontSize: "20px",
//                       fontWeight: 600,
//                       lineHeight: "24px",
//                       color: "#111827"
//                     }}
//                   >
//                     {t.name}
//                   </Typography>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                       mt: 2
//                     }}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: "16px",
//                         fontWeight: 400,
//                         lineHeight: "24px",
//                         color: "#292D32",
//                         textDecoration: "underline"
//                       }}
//                     >
//                       {t.email}
//                     </Typography>
//                     <Divider
//                       orientation="vertical"
//                       sx={{ height: "15px", backgroundColor: "#000000" }}
//                     />
//                     <Typography
//                       sx={{
//                         fontSize: "16px",
//                         fontWeight: 400,
//                         lineHeight: "24px",
//                         color: "#000000"
//                       }}
//                     >
//                       {t.phone}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 {/*complaint details*/}
//                 <Box sx={{ width: "972px" }}>
//                   <Typography
//                     sx={{
//                       fontSize: "16px",
//                       fontWeight: 500,
//                       lineHeight: "21.6px",
//                       color: "#000000",
//                       mt: 4
//                     }}
//                   >
//                     Complaint description
//                   </Typography>
//                   <Box
//                     sx={{
//                       fontSize: "16px",
//                       fontWeight: 400,
//                       lineHeight: "24px",
//                       color: "#1B1C1E",
//                       mt: 2
//                     }}
//                   >
//                     {t.complaint}
//                   </Box>
//                 </Box>

//                 {/*attachment*/}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 1,
//                     mt: 2
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       fontSize: "16px",
//                       fontWeight: 500,
//                       lineHeight: "21.6px",
//                       color: "#000000"
//                     }}
//                   >
//                     Attachments
//                   </Typography>
//                   {Array.isArray(t.attachment) && t.attachment.length > 0 ? (
//                     <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                       {t.attachment.map((file) => (
//                         <Card
//                           key={file.id}
//                           sx={{
//                             position: "relative",
//                             width: "149px",
//                             borderRadius: 2,
//                             overflow: "hidden"
//                           }}
//                         >
//                           {file.type === "image" ? (
//                             <CardMedia
//                               component="img"
//                               sx={{
//                                 width: "149px",
//                                 height: "101px"
//                               }}
//                               image={file.icon}
//                               alt={file.name}
//                             />
//                           ) : (
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 height: 140,
//                                 backgroundColor: "#f5f5f5"
//                               }}
//                             >
//                               <InsertDriveFileIcon
//                                 sx={{ fontSize: 48, color: "#d32f2f" }}
//                               />
//                               <Typography variant="caption">
//                                 {file.name}
//                               </Typography>
//                             </Box>
//                           )}

//                           {/* Overlay Download Button */}
//                           <Box
//                             sx={{
//                               position: "absolute",
//                               bottom: 8,
//                               right: 12,
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               width: "24px",
//                               height: "24px",
//                               borderRadius: "3px",
//                               backgroundColor: "#EFF3F9"
//                             }}
//                           >
//                             <IconButton
//                               onClick={() => {}}
//                               sx={{
//                                 color: "#EFF3F9",
//                                 "&:hover": {
//                                   backgroundColor: "rgba(0,0,0,0.7)"
//                                 }
//                               }}
//                             >
//                               <FileDownloadOutlinedIcon
//                                 sx={{ color: "#038F3E" }}
//                               />
//                             </IconButton>
//                           </Box>
//                         </Card>
//                       ))}
//                     </Box>
//                   ) : (
//                     <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//                       No attachments available.
//                     </Typography>
//                   )}
//                 </Box>

//                 {/*divider*/}
//                 <Box sx={{ width: "987px", textAlign: "center", my: 2 }}>
//                   <Divider
//                     sx={{
//                       borderBottom: "1px dashed #000000"
//                     }}
//                   />
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 2,
//                   width: "1032px",
//                   mt: 2,
//                   px: 10
//                 }}
//               >
//                 <Box sx={{ width: "972px" }}>
//                   <Typography
//                     sx={{
//                       fontSize: "20px",
//                       fontWeight: 600,
//                       lineHeight: "24px",
//                       color: "#111827"
//                     }}
//                   >
//                     Official Use
//                   </Typography>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 1.5,
//                       mt: 2
//                     }}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: "16px",
//                         fontWeight: 400,
//                         lineHeight: "24px",
//                         color: "#000000"
//                       }}
//                     >
//                       Receiving Officer ( for NHIA):{" "}
//                       <span
//                         style={{
//                           fontSize: "20px",
//                           fontWeight: 600,
//                           lineHeight: "24px",
//                           color: "#111827"
//                         }}
//                       >
//                         Abiodun Adeleke
//                       </span>
//                     </Typography>
//                     <Typography
//                       sx={{
//                         fontSize: "16px",
//                         fontWeight: 400,
//                         lineHeight: "24px",
//                         color: "#000000"
//                       }}
//                     >
//                       Signature:{" "}
//                       <span
//                         style={{
//                           fontSize: "14px",
//                           fontWeight: 500,
//                           lineHeight: "18.9px",
//                           color: "#038F3E"
//                         }}
//                       >
//                         Abiodun Adeleke
//                       </span>
//                     </Typography>

//                     <Typography
//                       sx={{
//                         fontSize: "14px",
//                         fontWeight: 400,
//                         lineHeight: "24px",
//                         color: "#111827"
//                       }}
//                     >
//                       Date: <span>14/04/2024</span>
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             </>
//           ))}
//         </>
//       ) : (
//         ""
//       )}

//       {/*Button*/}
//       <Box sx={{ display: "flex", justifyContent: "center" }}>
//         <Button
//           variant="outlined"
//           sx={{
//             width: "20%",
//             border: "1px solid #038F3E",
//             color: "#038F3E",
//             fontWeight: 500,
//             fontSize: "16px",
//             lineHeight: "24px",
//             textTransform: "capitalize",
//             padding: "12px 24px",
//             borderRadius: "50px",
//             mt: 8,
//             mb: 6
//           }}
//           onClick={handleReply}
//         >
//           Reply NHIA
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ProvidersComplaintThread;
