import {
  // Autocomplete,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  IconButton,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import {
  // useMemo,
  useState,
} from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import { getSingleComplaint, respondToComplaint } from "../../services/general";
import {
  multiLineStyles,
  // textFieldStyles
} from "../../utils/style";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { convertToBase64 } from "../../utils/convertTobase64";
import WithAuthorization from "../auth/withAuthorization";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { convertFileToBase64 } from "../../utils/convertTobase64";
// import { getAllHmo } from "../../services/settings";

const CentralReplyComplaintPage = () => {
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const navigate = useNavigate();
  const location = useLocation();
  const slug = location?.state?.thread;
  const responseTo = location?.state?.to;

  // const [selectedHMO, setSelectedHMO] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [respond, setRespond] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: complaint,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["complaints", slug],
    queryFn: () => getSingleComplaint(slug),
  });

  // const {
  //   data: response,
  //   //  isLoading,
  //   //  isError,
  //   //  error
  // } = useQuery({
  //   queryKey: ["complaints", slug],
  //   queryFn: () => getComplaintResponses(slug),
  // });

  // Function to handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setAttachments((prev) => {
      const newFiles = files.map((file) => ({
        file: file,
        preview: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
      }));

      return [...prev, ...newFiles].slice(0, 5);
    });
  };

  // Function to trigger the file input
  const handleAddAttachmentClick = () => {
    document.getElementById("contained-button-file").click();
  };

  // Function to remove an attachment
  const handleRemoveAttachment = (index) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index),
    );
  };

  const handleSubmit = async () => {
    // navigate(`/provider/complaint/${data.id}/thread`);
    setIsSubmitting(true);
    try {
      if (!respond) return handleError("Response field cannot be empty.");

      const docs = await Promise.all(
        attachments?.map(async (attachment) => {
          const base64 = await convertToBase64(attachment.file);
          return { document: base64 };
        }),
      );

      const data = {
        complaint: complaint?.id,
        ...(complaint?.complaint_against === "HMO" && {
          hmo_name: complaint?.hmo?.name,
          hmo_address: "Unknown Address",
        }),
        ...(complaint?.complaint_against === "Provider" && {
          provider_name: complaint?.provider?.name,
          provider_address: "Unknown Address",
        }),
        response: respond,
        response_recipient: responseTo,
        docs: docs,
      };

      let res = await respondToComplaint(data);

      setRespond("");
      setAttachments({});
      handleSuccess(res.data?.message || "Response sent successfully");
      if (res.data?.id) {
        navigate(`/admin/complaint/${complaint?.id}/thread`, {
          state: { thread: complaint?.id },
        });
      }
    } catch (error) {
      handleError("Failed to send response:", error);
    } finally {
      setIsSubmitting(false);
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
        sx={{
          mb: 2,
          color: "#1B5E20",
          textTransform: "none",
          p: 0,
        }}
      >
        Back to Complaint Thread
      </Button>
      <Card
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: "12px",
          boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {responseTo === "Complainant" && (
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#111827",
                mb: 2,
              }}
            >
              Complainant: {complaint?.firstname + " " + complaint?.lastname}
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "16px",
              color: "#111827",
            }}
          >
            Message {responseTo}
          </Typography>

          <Divider />

          {/* <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            sx={{
              position: "relative",
              zIndex: 9999
            }}
            options={hmos.map((option) => option?.label)}
            inputValue={selectedHMO}
            onInputChange={(event, newValue) => {
              if (newValue) {
                const selected = hmos.find((hmo) => hmo?.label === newValue);
                setSelectedHMO(selected || null);
              } else {
                setSelectedHMO(null);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Send response to..."
                sx={textFieldStyles}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    type: "search"
                  }
                }}
              />
            )}
          /> */}

          {/*Input fields*/}

          <Box>
            <TextField
              fullWidth
              multiline
              maxRows={8}
              variant="outlined"
              sx={multiLineStyles}
              placeholder="Type response here..."
              slotProps={{
                style: { textAlign: "start" },
              }}
              value={respond}
              onChange={(e) => setRespond(e.target.value)}
            />
          </Box>

          {/*Attachments & signatures*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 4,
              mt: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 1,
              }}
              onClick={handleAddAttachmentClick}
            >
              {/* Attachment Limit Alert */}
              {attachments?.length >= 5 && (
                <Typography variant="caption" sx={{ color: "#FF0000", mt: 1 }}>
                  Maximum attachment limit reached (5).
                </Typography>
              )}
              {attachments?.length > 0 && (
                <Box sx={{ width: "100%", my: 2 }}>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {attachments?.map((file, index) => (
                      <Card
                        key={index}
                        sx={{
                          width: "119.34px",
                          borderRadius: "8px",
                          position: "relative",
                          overflow: "hidden",
                          boxShadow:
                            "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
                        }}
                      >
                        {file?.type?.startsWith("image") ? (
                          <CardMedia
                            component="img"
                            image={file?.preview}
                            alt={file?.name}
                            sx={{
                              width: "100%",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          // File Name for Non-Image Files
                          <Box
                            sx={{
                              p: 1,
                              backgroundColor: "#F5F5F5",
                              borderRadius: "8px",
                              textAlign: "center",
                              height: "100px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "119.34px",
                            }}
                          >
                            {file?.type?.includes("pdf") ? (
                              <PictureAsPdfIcon
                                sx={{ color: "#FF7F50", mb: 1 }}
                              />
                            ) : file?.type?.includes("word") ||
                              file?.type?.includes("docx") ? (
                              <InsertDriveFileIcon
                                sx={{ color: "#1E90FF", mb: 1 }}
                              />
                            ) : file?.type?.includes("excel") ||
                              file?.type?.includes("xlsx") ? (
                              <InsertDriveFileIcon
                                sx={{ color: "#32CD32", mb: 1 }}
                              />
                            ) : (
                              <PictureAsPdfIcon
                                sx={{ color: "#FF7F50", mb: 1 }}
                              />
                            )}
                            <Typography
                              sx={{
                                position: "absolute",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                bottom: 8,
                                left: 6,
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#595959",
                              }}
                            >
                              {file?.name?.slice(0, 12)}
                            </Typography>
                          </Box>
                        )}

                        {/* Remove Attachment Button */}
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 12,
                            right: 6,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "12px",
                            height: "12px",
                            borderRadius: "3px",
                            backgroundColor: "#F2E2DD",
                          }}
                        >
                          <IconButton
                            onClick={() => handleRemoveAttachment(index)}
                            sx={{
                              position: "absolute",
                              color: "#FF0000",
                              "&:hover": { color: "#FF4500" },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}
              <Box sx={{ display: "flex", gap: 1 }}>
                <AttachmentOutlinedIcon />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
                    color: "#1B5E20",
                    cursor: "pointer",
                  }}
                >
                  Add attachment
                </Typography>
                <input
                  accept=".pdf,.docx,.jpg,.jpeg,.png"
                  multiple
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "18px",
                  color: "#475467",
                  mt: 1,
                }}
              >
                Upload max. 5 documents
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              disabled={isSubmitting}
              sx={{
                width: { xs: "80%", md: "26%" },
                backgroundColor: "#1B5E20",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                textTransform: "capitalize",
                padding: "10px 22px",
                borderRadius: "50px",
              }}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send Response"
              )}
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

const CentralReplyComplaint = WithAuthorization(CentralReplyComplaintPage, [
  "can_view_all_complaints",
  "can_view_complaint_details",
  "can_respond_to_complaints",
]);

export default CentralReplyComplaint;
