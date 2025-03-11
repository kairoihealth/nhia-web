import { useState } from "react";
// import { Helmet } from "react-helmet-async";
import Logo from "../../../assets/nhia-logo.png";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography,
  LinearProgress
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineFile } from "react-icons/ai";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#737373",
    border: "0.5px solid #DADADA",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E" // Green border color
    }
  }
};

const selectStyles = {
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "#F5F5F5",
  color: "#737373",
  border: "0.5px solid #DADADA",
  fontSize: "16px",
  outline: "none",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#038F3E" // Green border color
  }
};
const SecondForm = () => {
  const [files, setFiles] = useState([]);
  const maxFiles = 5;

  const onDrop = (acceptedFiles) => {
    if (files.length + acceptedFiles.length <= maxFiles) {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          progress: Math.floor(Math.random() * 50) + 20 // Simulating an upload progress
        })
      );
      setFiles([...files, ...filesWithPreview]);
    } else {
      alert(`You can only upload a maximum of ${maxFiles} files`);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: maxFiles - files.length
  });

  const removeFile = (file) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    URL.revokeObjectURL(file.preview); // Revoke the preview URL
  };

  return (
    <>
      {/* <Helmet>
        <title>Enrolee Complaint Form</title>
        <meta name="Enrolee Complaint Form" content=" " />
        <link rel="canonical" href="/" />
      </Helmet> */}
      <Box
        sx={{
          backgroundColor: { xs: "#FFFFFF", md: "#038F3E" }
          // height: "100%"
        }}
      >
        {/* <Container> */}
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
                margin: "2rem",
                borderRadius: "8px"
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
                Complaint Form
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  my: 4
                }}
              >
                Complainant Details
              </Typography>
              <form>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
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
                        lineHeight: "24px"
                      }}
                    >
                      Date of Incident
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      required
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
                        lineHeight: "24px"
                      }}
                    >
                      Time of Incident
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      fullWidth
                      type="time"
                      variant="outlined"
                      required
                      sx={textFieldStyles}
                    />
                  </Box>
                </Box>
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
                        lineHeight: "24px"
                      }}
                    >
                      NHIA programme
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <Select sx={selectStyles}>
                        <MenuItem value="individual">Individual</MenuItem>
                        <MenuItem value="family">Family</MenuItem>
                        <MenuItem value="group">Group</MenuItem>
                      </Select>
                    </FormControl>
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
                        lineHeight: "24px"
                      }}
                    >
                      Complaint Type
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <Select sx={selectStyles}>
                        <MenuItem value="discrimination">
                          Discrimination and refusal to treat/manage any
                          enrollees and their covered dependents after receiving
                          payment from the relevant HMOs on behalf of such
                          enrollees.
                        </MenuItem>
                        <MenuItem value="fee-paying">
                          Receipt and management of any enrollee as a fee-paying
                          patient.
                        </MenuItem>
                        <MenuItem value="co-payment">
                          Solicitation, collection, or charging any fee from any
                          enrollee in addition to the fees payable by NIS,
                          except for 10% co-payment for prescribed drugs.
                        </MenuItem>
                        {/* Add other options here */}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
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
                      color: "#595959",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px"
                    }}
                  >
                    Complaint Description
                    <span style={{ color: "#099243", marginLeft: "6px" }}>
                      *
                    </span>
                  </Typography>
                  <TextField
                    fullWidth
                    // label="Complaint Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    placeholder="enter complaint description"
                  />
                </Box>
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
                      color: "#595959",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px"
                    }}
                  >
                    Supporting Evidence
                  </Typography>
                  <FormControl sx={{ width: { xs: "100%", md: "40%" } }}>
                    <Box
                      {...getRootProps()}
                      sx={{
                        border: "2px dashed #ccc",
                        padding: "2rem",
                        textAlign: "center",
                        backgroundColor: "#f8f9fa",
                        cursor: "pointer",
                        marginTop: "1rem"
                      }}
                    >
                      <input {...getInputProps()} />
                      <BsCloudUpload size={48} style={{ color: "#6c757d" }} />
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: 400,
                          lineHeight: "18px",
                          color: "#475467",
                          mt: 2
                        }}
                      >
                        <span style={{ fontWeight: 600, color: "#6941C6" }}>
                          Click to upload
                        </span>{" "}
                        or drag and drop
                        <br />
                        <span>SVG, PNG, JPG, or GIF (max. 800x400px)</span>
                        <br />
                        Upload max. 5 documents in total
                      </Typography>
                    </Box>
                    {files.length > 0 && (
                      <Box mt={2}>
                        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                          {files.map((file, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "10px",
                                backgroundColor: "#f1f3f4",
                                borderRadius: "8px",
                                marginBottom: "8px"
                              }}
                            >
                              <AiOutlineFile
                                size={24}
                                style={{ marginRight: "10px" }}
                              />
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body2">
                                  {file.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                >
                                  {Math.round(file.size / 1024)} KB -{" "}
                                  {file.progress}% uploaded
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={file.progress}
                                  sx={{ marginTop: "4px" }}
                                />
                              </Box>
                              <Button
                                size="small"
                                color="error"
                                onClick={() => removeFile(file)}
                                sx={{ marginLeft: "10px" }}
                              >
                                x
                              </Button>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: { xs: "grid", md: "flex" },
                    justifyContent: { xs: "center", md: "flex-end" },
                    gap: 2,
                    mt: 4
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
                    href="/enrollee-form-preview"
                  >
                    Save & Continue
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
        {/* </Container> */}
      </Box>
    </>
  );
};

export default SecondForm;
