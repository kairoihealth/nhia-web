import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import PropTypes from "prop-types";
import TwoColumnLayout from "./TwoColumnLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormCardHeader from "./FormCardHeader";

const FormPreview = ({
  firstInfo,
  complaintInfo,
  onSubmit,
  isSubmitting,
  onBack,
  btn,
}) => {
  const [, setFiles] = useState(complaintInfo?.files || []);
  const handleDeleteFile = (fileId) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.id !== fileId);
      complaintInfo.files = updatedFiles;
      return updatedFiles;
    });
  };
  console.log(firstInfo, complaintInfo, "firstInfo");

  return (
    <TwoColumnLayout
      title="Review before submitting"
      subtitle="Check all details carefully. Once submitted, your complaint is assigned a unique Case ID."
      rightColumnSx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: "70%", md: "85%", lg: "65%" },
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",
          border: "1px solid #F0F0F0",
          overflowY: "auto",
        }}
      >
        <FormCardHeader
          title="Complaint Preview"
          subtitle="Review your complaint before submitting"
        />
        <FormCardHeader
          title="Complainant Details"
          titleSx={{ fontSize: "16px", mb: 0.5 }}
        />
        <Box
          sx={(theme) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "12px",
            p: 2.5,
            backgroundColor: "#F9F9F9",
            width: "100%",
            mb: 4,
          })}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "40%",
                }}
              >
                Name:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                {firstInfo.firstName} {firstInfo.middleName}{" "}
                {firstInfo.lastName}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "40%",
                }}
              >
                Contact Address:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                {firstInfo?.contactAddress}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "40%",
                }}
              >
                Email Address:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                {firstInfo.email}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "40%",
                }}
              >
                Phone Number:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                {firstInfo?.phone}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "40%",
                }}
              >
                NHIA Number:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                {firstInfo?.nhiaNo}
              </Typography>
            </Box>
            {firstInfo.organization && (
              <Box flex={1} sx={{ display: "flex", gap: 2 }}>
                <Typography
                  sx={{
                    color: "#595959",
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: 500,
                    lineHeight: "24px",
                    width: "40%",
                  }}
                >
                  Organization:
                </Typography>
                <Typography
                  sx={{
                    color: "#1B1C1E",
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: 500,
                    lineHeight: "24px",
                    width: "60%",
                  }}
                >
                  {firstInfo?.organization}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box>
          <FormCardHeader
            title="Complaint Details"
            titleSx={{ fontSize: "16px" }}
          />
          <Box
            sx={(theme) => ({
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "12px",
              p: 2.5,
              backgroundColor: "#F9F9F9",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            })}
          >
            <Box
              flex={1}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                }}
              >
                Complaint Type:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {complaintInfo?.complaint_type}
              </Typography>
            </Box>
            <Box
              flex={1}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                }}
              >
                Complaint Category:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {complaintInfo?.complaint_category}
              </Typography>
            </Box>
            <Box
              flex={1}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                }}
              >
                Complaint Against:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {firstInfo?.complaint_against}
              </Typography>
            </Box>
            <Box
              flex={1}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                }}
              >
                {firstInfo?.complaint_against}:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {firstInfo?.selectedHmoOrProviderName || firstInfo?.enrolleeNo}
              </Typography>
            </Box>
            <Box
              flex={1}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                }}
              >
                Date of Incident:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {complaintInfo?.date}
              </Typography>
            </Box>
            <Box
              flex={1}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                }}
              >
                Time of Incident:
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {complaintInfo?.time}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: "12px",
              p: 2.5,
              my: 4,
              gap: 3,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "21.6px",
                  color: "#000000",
                }}
              >
                Complaint Description
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  minHeight: "100px",
                  p: 1.5,
                  backgroundColor: "#FDFDFD",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  borderRadius: "8px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: 500,
                    lineHeight: "24px",
                    color: "#1B1C1E",
                  }}
                >
                  {complaintInfo?.otherDescription ||
                    complaintInfo?.description}
                </Typography>
              </Box>
              {complaintInfo.additional_information && (
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
                    Additional Information
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      minHeight: "100px",
                      p: 1.5,
                      backgroundColor: "#FDFDFD",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px",
                        color: "#1B1C1E",
                      }}
                    >
                      {complaintInfo.additional_information}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                pb: 2,
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
              {Array.isArray(complaintInfo?.files) &&
              complaintInfo.files.length > 0 ? (
                <Box sx={{ display: "flex", gap: 2 }}>
                  {complaintInfo?.files?.map((file) => (
                    <Card
                      key={file.id}
                      sx={{
                        position: "relative",
                        width: "100%",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      {file.type?.startsWith("image/") ? (
                        <CardMedia
                          component="img"
                          sx={{ width: "100%", height: "101px", p: 1 }}
                          image={file.preview || file.icon}
                          alt={file.name}
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
                            p: 1,
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
                          backgroundColor: "#F2E2DD",
                        }}
                      >
                        <IconButton
                          onClick={() => handleDeleteFile(file.id)}
                          sx={{
                            // backgroundColor: "rgba(0,0,0,0.5)",
                            color: "#EB001B",
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0.7)",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Card>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  No attachments available.
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "flex-end",
              // alignItems: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                my: 1,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{
                  width: "fit-content",
                  height: "48px",
                  borderRadius: "16px",
                  py: 1.5,
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  textTransform: "capitalize",
                  borderColor: "#1B5E20",
                  color: "#1B5E20",
                  "&:hover": { borderColor: "#1B5E20" },
                }}
                onClick={onBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                  height: "48px",
                  borderRadius: "16px",
                  py: 1.5,
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  textTransform: "capitalize",
                  backgroundColor: "#1B5E20",
                  "&:hover": { backgroundColor: "#1B5E20" },
                }}
                // href="/"
                onClick={onSubmit}
                loading={isSubmitting}
              >
                Submit Complaint
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </TwoColumnLayout>
  );
};

export default FormPreview;

FormPreview.propTypes = {
  firstInfo: PropTypes.shape({
    firstName: PropTypes.string,
    middleName: PropTypes.string | undefined,
    lastName: PropTypes.string,
    contactAddress: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    nhiaNo: PropTypes.string,
    complaint_against: PropTypes.string,
    selectedHmoOrProviderName: PropTypes.string,
    enrolleeNo: PropTypes.string,
    organization: PropTypes.string,
  }),
  complaintInfo: PropTypes.shape({
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        preview: PropTypes.string,
      }),
    ),
    date: PropTypes.string,
    time: PropTypes.string,
    programme: PropTypes.string,
    complaint_type: PropTypes.string,
    complaint_category: PropTypes.string,
    description: PropTypes.string,
    otherDescription: PropTypes.string,
    additional_information: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool,
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
  btn: PropTypes.any,
};
