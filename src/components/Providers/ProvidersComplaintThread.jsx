import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  IconButton,
  Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import hospital1 from "../../assets/hospital1.png";
import hospital2 from "../../assets/hospital2.png";
import hospital3 from "../../assets/hospital3.png";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useState } from "react";

const data = {
  id: 1,
  name: "John Doe",
  email: "john@doe.com",
  phone: "123-456-9999",
  complaint_no: "11023",
  complaint:
    "I've been experiencing issues with my HMO, and my doctor hasn't seen me in over a year. I'd like to discuss my concerns and see if there's anything I can do to improve my quality of life.",
  status: "Open",
  attachment: [
    { id: 1, name: "testing 1", icon: hospital1, type: "image" },
    { id: 2, name: "testing 2", icon: hospital2, type: "image" },
    { id: 3, name: "testing 3", icon: hospital3, type: "image" }
  ]
};

const repsonseData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    phone: "123-456-9999",
    complaint_no: "11023",
    complaint:
      "I've been experiencing issues with my HMO, and my doctor hasn't seen me in over a year. I'd like to discuss my concerns and see if there's anything I can do to improve my quality of life.",
    status: "Open",
    attachment: [
      { id: 1, name: "testing 1", icon: hospital1, type: "image" },
      { id: 2, name: "testing 2", icon: hospital2, type: "image" },
      { id: 3, name: "testing 3", icon: hospital3, type: "image" }
    ]
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@doe.com",
    phone: "123-456-9999",
    complaint_no: "11023",
    complaint:
      "I've been experiencing issues with my HMO, and my doctor hasn't seen me in over a year. I'd like to discuss my concerns and see if there's anything I can do to improve my quality of life.",
    status: "Open",
    attachment: [
      { id: 1, name: "testing 1", icon: hospital1, type: "image" },
      { id: 2, name: "testing 2", icon: hospital2, type: "image" },
      { id: 3, name: "testing 3", icon: hospital3, type: "image" }
    ]
  }
];
const ProvidersComplaintThread = () => {
  const { id } = useParams();
  console.log(id, "checking...");
  const navigate = useNavigate();

  const [isResponse] = useState(true);

  const handleReply = () => {
    navigate(`/provider/complaint/${id}/reply`, { state: { data } });
  };

  return (
    <Box>
      {/*Head*/}
      <Box sx={{ px: 2 }}>
        <Box sx={{ mt: 2 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "32.4px",
              color: "#1B1C1E"
            }}
          >
            Complaints thread
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "32.4px",
                color: "#111827"
              }}
            >
              {data.complaint_no} - Access to services
            </Typography>
            <Box
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.5,
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "21.6px",
                borderRadius: "8px",
                backgroundColor:
                  data.status === "Pending"
                    ? "#FFF3E7"
                    : data.status === "Resolved"
                    ? "#D6EBFF"
                    : "#E8F8EE",
                color:
                  data.status === "Pending"
                    ? "#EDB378"
                    : data.status === "Resolved"
                    ? "#4B95DD"
                    : "#096F35"
              }}
            >
              &bull; {data.status || "N/A"}
            </Box>
          </Box>
          <Typography sx={{ mt: 1, cursor: "pointer" }}>
            View Complain details
          </Typography>
        </Box>
      </Box>

      {/*Complaint trail*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "1032px",
          mt: 6,
          px: 10
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "24px",
              color: "#111827"
            }}
          >
            {data.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#292D32",
                textDecoration: "underline"
              }}
            >
              {data.email}
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
                color: "#000000"
              }}
            >
              {data.phone}
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
              mt: 4
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
              mt: 2
            }}
          >
            {data.complaint}
          </Box>
        </Box>

        {/*attachment*/}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
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
          {Array.isArray(data.attachment) && data.attachment.length > 0 ? (
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {data.attachment.map((file) => (
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
                      backgroundColor: "#EFF3F9"
                    }}
                  >
                    <IconButton
                      onClick={() => {}}
                      sx={{
                        color: "#EFF3F9",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.7)"
                        }
                      }}
                    >
                      <FileDownloadOutlinedIcon sx={{ color: "#038F3E" }} />
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

        {/*divider*/}
        <Box sx={{ width: "987px", textAlign: "center", my: 2 }}>
          <Divider
            sx={{
              borderBottom: "1px dashed #737373"
            }}
          />
        </Box>
      </Box>

      {/*Message trail*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "1032px",
          mt: 2,
          px: 10
        }}
      >
        <Box sx={{ width: "972px" }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: "24px",
              color: "#111827"
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
              mt: 2
            }}
          >
            {data.complaint}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#111827"
              }}
            >
              Sent by: <span>Abiodun Adeleke</span>
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#111827"
              }}
            >
              Date: <span>14/04/2024</span>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/*Complaint responses*/}
      {isResponse ? (
        <>
          {repsonseData.map((t) => (
            <>
              <Box sx={{ width: "100%", textAlign: "center", my: 3 }}>
                <Divider
                  sx={{
                    borderBottom: "2px solid #7E7E7E"
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 500,
                  lineHeight: "32.4px",
                  color: "#071C42",
                  px: 4
                }}
              >
                Respondent
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "1032px",
                  mt: 6,
                  px: 10
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 600,
                      lineHeight: "24px",
                      color: "#111827"
                    }}
                  >
                    {t.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 2
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: "#292D32",
                        textDecoration: "underline"
                      }}
                    >
                      {t.email}
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
                        color: "#000000"
                      }}
                    >
                      {t.phone}
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
                      mt: 4
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
                      mt: 2
                    }}
                  >
                    {t.complaint}
                  </Box>
                </Box>

                {/*attachment*/}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    mt: 2
                  }}
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
                  {Array.isArray(t.attachment) && t.attachment.length > 0 ? (
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      {t.attachment.map((file) => (
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
                              backgroundColor: "#EFF3F9"
                            }}
                          >
                            <IconButton
                              onClick={() => {}}
                              sx={{
                                color: "#EFF3F9",
                                "&:hover": {
                                  backgroundColor: "rgba(0,0,0,0.7)"
                                }
                              }}
                            >
                              <FileDownloadOutlinedIcon
                                sx={{ color: "#038F3E" }}
                              />
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

                {/*divider*/}
                <Box sx={{ width: "987px", textAlign: "center", my: 2 }}>
                  <Divider
                    sx={{
                      borderBottom: "1px dashed #737373"
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "1032px",
                  mt: 2,
                  px: 10
                }}
              >
                <Box sx={{ width: "972px" }}>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 600,
                      lineHeight: "24px",
                      color: "#111827"
                    }}
                  >
                    Official Use
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      mt: 2
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: "#000000"
                      }}
                    >
                      Receiving Officer ( for NHIA):{" "}
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: 600,
                          lineHeight: "24px",
                          color: "#111827"
                        }}
                      >
                        Abiodun Adeleke
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: "#000000"
                      }}
                    >
                      Signature:{" "}
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "18.9px",
                          color: "#038F3E"
                        }}
                      >
                        Abiodun Adeleke
                      </span>
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "24px",
                        color: "#111827"
                      }}
                    >
                      Date: <span>14/04/2024</span>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          ))}
        </>
      ) : (
        ""
      )}

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
            mb: 6
          }}
          onClick={handleReply}
        >
          Reply NHIA
        </Button>
      </Box>
    </Box>
  );
};

export default ProvidersComplaintThread;
