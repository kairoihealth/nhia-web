// import { Helmet } from "react-helmet-async";
import Logo from "../../../assets/nhia-logo.png";
import {
  Box,
  Button,
  Card,
  // CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import hospital1 from "../../../assets/hospital1.png";
import hospital2 from "../../../assets/hospital2.png";
import hospital3 from "../../../assets/hospital3.png";
import { useState } from "react";

const FormPreview = () => {
  const [files, setFiles] = useState([
    { id: 1, name: "testing 1", icon: hospital1, type: "image" },
    { id: 2, name: "testing 2", icon: hospital2, type: "image" },
    { id: 3, name: "testing 3", icon: hospital3, type: "image" }
  ]);

  const handleDeleteFile = (fileId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  return (
    <>
      {/* <Helmet>
        <title>Form Preview</title>
        <meta name="Form Preview" content=" " />
        <link rel="canonical" href="/" />
      </Helmet> */}
      <Box
        sx={{
          backgroundColor: { xs: "#FFFFFF", md: "#038F3E" }
          // height: "100%"
        }}
      >
        <Box
          sx={{
            display: { xs: "grid", md: "flex" },
            justifyContent: "center",
            alignItems: { xs: "flex-start", md: "center" },
            pt: { xs: 0, md: 4 }
          }}
        >
          <Box>
            <Box
              sx={{
                width: { xs: "400px", md: "1280px" },
                backgroundColor: "#fff",
                padding: "2rem",
                margin: { xs: 0, md: "2rem" },
                borderRadius: "8px",
                px: { xs: 2, md: 16 }
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
                  margin: "1rem 0"
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
                  my: 4
                }}
              >
                Complainant Details
              </Typography>
              <Box
                sx={{
                  width: { xs: "100%", md: "40%" },
                  height: "232px",
                  border: "0.5px solid #DADADA",
                  borderRadius: "8px",
                  backgroundColor: "#F5F5F5",
                  p: 2
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
                        width: "40%"
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
                        width: "60%"
                      }}
                    >
                      Gabriella
                    </Typography>
                  </Box>
                  <Box flex={1} sx={{ display: "flex", gap: 2 }}>
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px",
                        width: "40%"
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
                        width: "60%"
                      }}
                    >
                      e.g H 23 dolphin estate
                    </Typography>
                  </Box>
                  <Box flex={1} sx={{ display: "flex", gap: 2 }}>
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px",
                        width: "40%"
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
                        width: "60%"
                      }}
                    >
                      Gabriellajames.@let.com
                    </Typography>
                  </Box>
                  <Box flex={1} sx={{ display: "flex", gap: 2 }}>
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px",
                        width: "40%"
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
                        width: "60%"
                      }}
                    >
                      +234 8176543210
                    </Typography>
                  </Box>
                  <Box flex={1} sx={{ display: "flex", gap: 2 }}>
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px",
                        width: "40%"
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
                        width: "60%"
                      }}
                    >
                      e.g H 23 dolphin estate
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
                    my: 4
                  }}
                >
                  Complaint Details
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "60%",
                    gap: 1
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
                        lineHeight: "18.9px"
                      }}
                    >
                      Date of Incident:
                    </Typography>
                    <Typography
                      sx={{
                        color: "#1B1C1E",
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      12/04/2024
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
                        lineHeight: "18.9px"
                      }}
                    >
                      Time of Incident:
                    </Typography>
                    <Typography
                      sx={{
                        color: "#1B1C1E",
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      12:00PM
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
                    height: { xs: "auto", md: "393px" },
                    border: "1px solid #D4D4D4B2",
                    borderRadius: "8px",
                    p: 2,
                    my: 6,
                    gap: 6
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
                        color: "#000000"
                      }}
                    >
                      Complaint Description
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: { xs: "100%", md: "972px" },
                        height: { xs: "auto", md: "149px" },
                        border: "1px solid #E4E4E7",
                        borderRadius: "8px",
                        backgroundColor: "#F8F8F8",
                        p: 2
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "14px", md: "16px" },
                          fontWeight: 500,
                          lineHeight: "24px",
                          color: "#1B1C1E"
                        }}
                      >
                        Nibh tellus pulvinar feugiat aliquet tellus vulputate
                        elementum. Neque eget nec nisi vel commodo. Mi netus ac
                        arcu nec adipiscing aliquam fames a. Feugiat in maecenas
                        tempor sapien. Sed integer euismod a vel. Habitasse
                        tincidunt egestas dolor velit lacus. Quam est egestas
                        egestas vitae eleifend erat. Massa cras morbi et
                        sollicitudin tristique. Quis ipsum sollicitudin est
                        turpis. Aliquam nulla faucibus massa amet. Et sit sed
                        enim nunc aliquet donec est. Blandit mollis nisl mi
                        lorem congue quam.
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "21.6px",
                        color: "#000000"
                      }}
                    >
                      Attachments
                    </Typography>
                    {Array.isArray(files) && files.length > 0 ? (
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        {files.map((file) => (
                          <Card
                            key={file.id}
                            sx={{
                              position: "relative",
                              width: "149px",
                              borderRadius: 2,
                              overflow: "hidden"
                            }}
                          >
                            {file.type === "image" ? (
                              <CardMedia
                                component="img"
                                sx={{
                                  width: "149px",
                                  height: "101px"
                                }}
                                image={file.icon}
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
                                  backgroundColor: "#f5f5f5"
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
                                backgroundColor: "#F2E2DD"
                              }}
                            >
                              <IconButton
                                onClick={() => handleDeleteFile(file.id)}
                                sx={{
                                  // backgroundColor: "rgba(0,0,0,0.5)",
                                  color: "#EB001B",
                                  "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.7)"
                                  }
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
                    display: { xs: "grid", md: "flex" },
                    justifyContent: { xs: "center", md: "flex-end" },
                    gap: 2,
                    my: 4
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
                      "&:hover": { borderColor: "#038F3E" }
                    }}
                    href="/"
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
                      "&:hover": { backgroundColor: "#038F3E" }
                    }}
                    href="/"
                  >
                    Submit
                  </Button>
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
