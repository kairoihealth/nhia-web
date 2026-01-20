import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import { useEffect, useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { getSingleComplaint, respondToComplaint } from "../../services/general";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { useQuery } from "@tanstack/react-query";
import { convertToBase64 } from "../../utils/convertTobase64";
import { getSingleUser } from "../../services/central";
import WithAuthorization from "../auth/withAuthorization";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#000000",
    border: "0.5px solid #DADADA",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E",
    },
  },
};

const multiLineStyles = {
  "& .MuiOutlinedInput-root": {
    height: "204px",
    borderRadius: "8px",
    color: "#000000",
    "& .MuiOutlinedInput-input": {
      paddingTop: 0,
      paddingBottom: "16px",
      marginTop: 0,
      alignSelf: "flex-start",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E",
    },
  },
};

const getUserId = () => localStorage.getItem("userId");

const ProvidersReplyComplaintPage = () => {
  const userId = getUserId();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const navigate = useNavigate();

  // const location = useLocation();
  // const { data } = location.state || {};

  const location = useLocation();
  const slug = location?.state?.thread;
  const [attachments, setAttachments] = useState([]); // State to store selected files
  const [providerName, setProviderName] = useState("");
  const [address, setAddress] = useState("");
  const [respond, setRespond] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: user,
    //  isLoading,
    //  isError,
    //  error
  } = useQuery({
    queryKey: ["complaints", userId],
    queryFn: () => getSingleUser(userId),
  });

  const {
    data: complaint,
    //  isLoading,
    //  isError,
    //  error
  } = useQuery({
    queryKey: ["complaints", slug],
    queryFn: () => getSingleComplaint(slug),
  });

  useEffect(() => {
    if (user) {
      setProviderName(user.firstname + " " + user.lastname);
      setAddress(user.address || "");
    }
  }, [user]);

  // const providerName = user?.firstname + " " + user?.lastname;

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
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async () => {
    if (!respond) return handleError("Response field cannot be empty.");
    if (attachments.length === 0)
      return handleError("Please add one or more attachments");

    setIsSubmitting(true);
    try {
      const docs = await Promise.all(
        attachments?.map(async (attachment) => {
          const base64 = await convertToBase64(attachment.file);
          return { document: base64 };
        })
      );

      const data = {
        complaint: complaint?.id,
        provider_name: providerName,
        provider_address: address || "Unknown Address",
        response: respond,
        docs: docs,
      };

      let res = await respondToComplaint(data);

      setRespond("");
      setAttachments({});
      handleSuccess(res.data?.message || "Response sent successfully");
      if (res.data?.id) {
        navigate(`/provider/complaint/${complaint?.case_id}/thread`, {
          state: { thread: complaint?.id },
        });
      }
    } catch (error) {
      handleError("Failed to send response:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: "flex", p: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "1034px",
          height: "auto",
        }}
      >
        {/*Header*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "59px",
            backgroundColor: "#20201E",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            px: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "21.6px",
              color: "#FFFFFF",
            }}
          >
            Complaint Response to NHIA
          </Typography>
        </Box>

        {/*Messages*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "1032px",
            mt: 2,
            px: 5,
          }}
        >
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
                mt: 2,
              }}
            >
              {complaint?.description}
            </Box>
            <Box sx={{ mt: 2 }}>
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
                  {complaint?.firstname || "-"} {complaint?.lastname || "-"}
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
                  {new Date(complaint?.created_at).toLocaleDateString() || "--"}
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/*Reply*/}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, p: 5 }}>
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

          {/*Input fields*/}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
            mt={2}
          >
            <Box
              flex={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Provider&apos;s Name
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                required
                placeholder="Provider's name"
                value={providerName || ""}
                onChange={(e) => setProviderName(e.target.value)}
                // disabled
                sx={textFieldStyles}
              />
            </Box>
            <Box
              flex={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Provider&apos;s Address
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                required
                placeholder="Provider's address"
                value={address || ""}
                onChange={(e) => setAddress(e.target.value)}
                // disabled
                sx={textFieldStyles}
              />
            </Box>
          </Box>
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
                width: "60%",
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
              {attachments.length > 0 && (
                <Box sx={{ width: "523px", my: 2 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
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
                    color: "#038F3E",
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

            <Box
              flex={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                width: "300px",
              }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Signature of Provider
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <TextField
                variant="outlined"
                required
                placeholder="input fullname to sign"
                sx={textFieldStyles}
              />
            </Box>
          </Box>

          {/*Button */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                width: "26%",
                backgroundColor: "#038F3E",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                textTransform: "capitalize",
                padding: "12px 24px",
                borderRadius: "50px",
                mt: 8,
                mb: 6,
              }}
              onClick={handleSubmit}
              loading={isSubmitting}
            >
              Send Response
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ProvidersReplyComplaint = WithAuthorization(ProvidersReplyComplaintPage, [
  "can_view_all_complaints",
  "can_view_complaint_details",
  "can_respond_to_complaints",
]);

export default ProvidersReplyComplaint;
