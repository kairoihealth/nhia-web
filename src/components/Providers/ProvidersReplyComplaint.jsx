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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { getSingleComplaint, respondToComplaint } from "../../services/general";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { useQuery } from "@tanstack/react-query";
import { convertToBase64 } from "../../utils/convertTobase64";
import WithAuthorization from "../auth/withAuthorization";
import { multiLineStyles } from "../../utils/style";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#000000",
    border: "0.5px solid #DADADA",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1B5E20",
    },
  },
};

const ProvidersReplyComplaintPage = () => {
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const navigate = useNavigate();
  const location = useLocation();
  const slug = location?.state?.thread;
  const responseTo = location?.state?.to;

  const [attachments, setAttachments] = useState([]); // State to store selected files
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

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Check if the total number of attachments exceeds 5
    if (attachments.length + selectedFiles.length > 5) {
      alert("You can only add up to 5 attachments.");
      return;
    }

    // Update the attachments state
    setAttachments((prevAttachments) => [
      ...prevAttachments,
      ...selectedFiles.map((file) => ({
        file, // Store the file object
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null, // Create preview for images
      })),
    ]);
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
        navigate(`/provider/complaint/${complaint?.id}/thread`, {
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
              {attachments.length >= 5 && (
                <Typography variant="caption" sx={{ color: "#FF0000", mt: 1 }}>
                  Maximum attachment limit reached (5).
                </Typography>
              )}
              {attachments?.length > 0 && (
                <Box sx={{ width: "100%", my: 2 }}>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {attachments?.map((attachment, index) => (
                      <Card
                        key={index}
                        sx={{
                          width: "119.34px",
                          borderRadius: "8px",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {/* Image Preview */}
                        {attachment.preview ? (
                          <CardMedia
                            component="img"
                            image={attachment.preview}
                            alt={attachment.name}
                            sx={{
                              width: "100%",
                              height: "80px",
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
                            {attachment.type.includes("pdf") ? (
                              <PictureAsPdfIcon
                                sx={{ color: "#FF7F50", mb: 1 }}
                              />
                            ) : attachment.type.includes("word") ||
                              attachment.type.includes("docx") ? (
                              <InsertDriveFileIcon
                                sx={{ color: "#1E90FF", mb: 1 }}
                              />
                            ) : attachment.type.includes("excel") ||
                              attachment.type.includes("xlsx") ? (
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
                              {attachment.name.slice(0, 12)}
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveAttachment(index);
                            }}
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

          {/*Button */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                width: { xs: "80%", md: "26%" },
                backgroundColor: "#1B5E20",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                textTransform: "capitalize",
                padding: "12px 24px",
                borderRadius: "50px",
              }}
              onClick={handleSubmit}
              disabled={isSubmitting}
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

const ProvidersReplyComplaint = WithAuthorization(ProvidersReplyComplaintPage, [
  "can_view_all_complaints",
  "can_view_complaint_details",
  "can_respond_to_complaints",
]);

export default ProvidersReplyComplaint;
