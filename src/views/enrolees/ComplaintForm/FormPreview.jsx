import Logo from "../../../assets/nhia-logo.png";
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

  return (
    <>
      <Box
        sx={{
          backgroundColor: { xs: "#FFFFFF", md: "#038F3E" },
        }}
      >
        <Box
          sx={{
            display: { xs: "grid", md: "flex" },
            justifyContent: "center",
            alignItems: { xs: "flex-start", md: "center" },
            py: { xs: 0, md: 4 },
          }}
        >
          <Box>
            <Box
              sx={{
                width: { xs: "400px", md: "100%" },
                backgroundColor: "#fff",
                padding: "2rem",
                // margin: { xs: 0, md: "2rem" },
                borderRadius: "8px",
                px: { xs: 2, md: 16 },
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{ display: "block", margin: "0 auto" }}
              />
              <Typography
                align="center"
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  color: "#038F3E",
                  margin: "1rem 0",
                }}
              >
                Complaint Preview
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "21.6px",
                  color: "#038F3E",
                  my: 4,
                }}
              >
                Complainant Details
              </Typography>
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" },
                  height: "232px",
                  border: "0.5px solid #DADADA",
                  borderRadius: "8px",
                  backgroundColor: "#F5F5F5",
                  p: 2,
                }}
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
                      {firstInfo.firstName} {firstInfo.lastName}
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
                      HMO of Complainant:
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
                      {complaintInfo?.complaint}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    fontWeight: 500,
                    lineHeight: "21.6px",
                    color: "#038F3E",
                    my: 4,
                  }}
                >
                  Complaint Details
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "60%",
                    gap: 1,
                  }}
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
                    width: { xs: "100%", md: "1010px" },
                    height: { xs: "auto", md: "auto" },
                    border: "1px solid #D4D4D4B2",
                    borderRadius: "8px",
                    p: 2,
                    my: 6,
                    gap: 6,
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
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
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        width: { xs: "100%", md: "972px" },
                        height: { xs: "auto", md: "149px" },
                        border: "1px solid #E4E4E7",
                        borderRadius: "8px",
                        backgroundColor: "#F8F8F8",
                        p: 2,
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
                        {complaintInfo?.description}
                      </Typography>
                    </Box>
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
                        {complaintInfo.files.map((file) => (
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
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      display: { xs: "grid", md: "flex" },
                      justifyContent: { xs: "center", md: "flex-end" },
                      gap: 2,
                      my: 4,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        width: "270px",
                        height: "48px",
                        borderRadius: "16px",
                        py: 1.5,
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px",
                        textTransform: "capitalize",
                        borderColor: "#038F3E",
                        color: "#038F3E",
                        "&:hover": { borderColor: "#038F3E" },
                      }}
                      // href="/"
                      onClick={onBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: "270px",
                        height: "48px",
                        borderRadius: "16px",
                        py: 1.5,
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px",
                        textTransform: "capitalize",
                        backgroundColor: "#038F3E",
                        "&:hover": { backgroundColor: "#038F3E" },
                      }}
                      // href="/"
                      onClick={onSubmit}
                      loading={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Box>
                  <Box sx={{ width: "20%" }}>{btn}</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FormPreview;

FormPreview.propTypes = {
  firstInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    contactAddress: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
  complaintInfo: PropTypes.shape({
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        preview: PropTypes.string,
      })
    ),
    date: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
    complaint: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  onBack: PropTypes.func,
  btn: PropTypes.any,
};
