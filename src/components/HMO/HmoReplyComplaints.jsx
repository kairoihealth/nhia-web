import {
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
import { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import { getSingleComplaint, respondToComplaint } from "../../services/general";
import { multiLineStyles } from "../../utils/style";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { convertToBase64 } from "../../utils/convertTobase64";
import WithAuthorization from "../auth/withAuthorization";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const HmoReplyComplaintPage = () => {
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const navigate = useNavigate();
  const location = useLocation();
  const slug = location?.state?.thread;
  const responseTo = location?.state?.to;

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

  const handleAddAttachmentClick = () => {
    document.getElementById("contained-button-file").click();
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index),
    );
  };

  const handleSubmit = async () => {
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
        response: respond,
        response_recipient: responseTo || "All",
        docs: docs,
      };

      let res = await respondToComplaint(data);

      setRespond("");
      setAttachments([]);
      handleSuccess(res.data?.message || "Response sent successfully");
      if (res.data?.id) {
        navigate(`/hmo/complaint/${complaint?.id}/thread`, {
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

          <Box>
            <TextField
              fullWidth
              multiline
              maxRows={8}
              variant="outlined"
              sx={multiLineStyles}
              placeholder="Type response here..."
              value={respond}
              onChange={(e) => setRespond(e.target.value)}
            />
          </Box>

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
                        {file.preview ? (
                          <CardMedia
                            component="img"
                            image={file.preview}
                            alt={file.name}
                            sx={{
                              width: "100%",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              p: 1,
                              backgroundColor: "#F5F5F5",
                              height: "100px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {file.type.includes("pdf") ? (
                              <PictureAsPdfIcon sx={{ color: "#FF7F50" }} />
                            ) : (
                              <InsertDriveFileIcon sx={{ color: "#1E90FF" }} />
                            )}
                            <Typography
                              variant="caption"
                              sx={{
                                mt: 1,
                                textAlign: "center",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                width: "100%",
                              }}
                            >
                              {file.name}
                            </Typography>
                          </Box>
                        )}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveAttachment(index);
                            }}
                            sx={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                          >
                            <DeleteIcon fontSize="small" color="error" />
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

const HmoReplyComplaint = WithAuthorization(HmoReplyComplaintPage, [
  "can_view_all_complaints",
  "can_view_complaint_details",
  "can_respond_to_complaints",
]);

export default HmoReplyComplaint;
