import { useState } from "react";
import Logo from "../../../assets/nhia-logo.png";
import { Box, TextField, Button, FormControl, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineFile } from "react-icons/ai";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import { complaintType, nhiaProgram } from "../../../mock/type";
import { selectStyles, textFieldStyles } from "../../../utils/style";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const SecondForm = ({
  complaintInfo,
  setComplaintInfo,
  onNext,
  onBack,
  btn,
}) => {
  const maxFiles = 5;
  const [errors, setErrors] = useState({});

  const onDrop = (acceptedFiles) => {
    // console.log("Accepted Files:", acceptedFiles);
    const currentFilesLength = complaintInfo.files?.length || 0;
    if (currentFilesLength + acceptedFiles.length <= maxFiles) {
      const filesWithPreview = acceptedFiles.map((file) => ({
        ...file,
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        path: file.path,
        preview: URL.createObjectURL(file),
        raw: file,
      }));
      setComplaintInfo((prev) => {
        const updatedFiles = [...(prev.files || []), ...filesWithPreview];
        // console.log("Updated complaintInfo.files:", updatedFiles);
        return {
          ...prev,
          files: updatedFiles,
        };
      });
    } else {
      alert(`You can only upload a maximum of ${maxFiles} files`);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    maxFiles: 5 - (complaintInfo.files?.length || 0),
  });
  const removeFile = (fileToRemove) => {
    setComplaintInfo((prev) => {
      const updatedFiles =
        prev.files?.filter((file) => file.id !== fileToRemove.id) || [];
      URL.revokeObjectURL(fileToRemove.preview); // Free up memory
      return { ...prev, files: updatedFiles };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintInfo({ ...complaintInfo, [name]: value });
  };

  const handleComplaintChange = (selectedOption) => {
    setComplaintInfo({ ...complaintInfo, complaint: selectedOption.value });
  };

  const handleProgramChange = (selectedOption) => {
    setComplaintInfo({ ...complaintInfo, programme: selectedOption.value });
  };

  console.log(complaintInfo, "complaintInfo");
  const validateFields = () => {
    const newErrors = {};

    if (!complaintInfo.date?.trim()) newErrors.date = "Date is required.";
    if (!complaintInfo.time?.trim()) newErrors.time = "Time is required.";
    if (!complaintInfo.programme?.trim())
      newErrors.programme = "Nhia programme is required.";
    if (!complaintInfo.complaint)
      newErrors.complaint = "Please select a complaint type.";
    if (!complaintInfo.description?.trim())
      newErrors.description = "Description is required.";
    if (!complaintInfo.files || complaintInfo.files?.length === 0)
      newErrors.files = "Please provide attachments to support your claim.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext();
    }
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
            pt: { xs: 0, md: 4 },
          }}
        >
          <Box>
            <Box
              sx={{
                width: { xs: "400px", md: "1280px" },
                backgroundColor: "#fff",
                padding: "2rem",
                margin: "2rem",
                borderRadius: "8px",
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
                Complaint Form
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  my: 4,
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
                        lineHeight: "24px",
                      }}
                    >
                      Date of Incident
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      name="date"
                      fullWidth
                      type="date"
                      variant="outlined"
                      required
                      sx={textFieldStyles}
                      value={complaintInfo.date}
                      onChange={handleInputChange}
                      error={!!errors.date}
                      helperText={errors.date}
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
                      Time of Incident
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      name="time"
                      fullWidth
                      type="time"
                      variant="outlined"
                      required
                      sx={textFieldStyles}
                      value={complaintInfo.time}
                      onChange={handleInputChange}
                      error={!!errors.time}
                      helperText={errors.time}
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
                        lineHeight: "24px",
                      }}
                    >
                      NHIA programme
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <ReactSelect
                      styles={selectStyles}
                      value={nhiaProgram.find(
                        (el) => el.id === complaintInfo.programme
                      )}
                      onChange={handleProgramChange}
                      options={nhiaProgram}
                      placeholder="Select option"
                    />
                    {errors.programme && (
                      <Typography
                        sx={{ color: "red", fontSize: "13px", mt: 0.5 }}
                      >
                        {errors.programme}
                      </Typography>
                    )}
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
                      Complaint Type
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <ReactSelect
                      styles={selectStyles}
                      value={complaintType.find(
                        (type) => type.id === complaintInfo.complaint
                      )}
                      onChange={handleComplaintChange}
                      options={complaintType}
                      placeholder="Select option"
                    />
                    {errors.complaint && (
                      <Typography
                        sx={{ color: "red", fontSize: "13px", mt: 0.5 }}
                      >
                        {errors.complaint}
                      </Typography>
                    )}
                  </Box>
                </Box>
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
                      color: "#595959",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    Complaint Description
                    <span style={{ color: "#099243", marginLeft: "6px" }}>
                      *
                    </span>
                  </Typography>
                  <TextField
                    name="description"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    placeholder="enter complaint description"
                    value={complaintInfo.description}
                    onChange={handleInputChange}
                    error={!!errors.description}
                    helperText={errors.description}
                  />
                </Box>
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
                      color: "#595959",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
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
                        marginTop: "1rem",
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
                          mt: 2,
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
                    {errors?.files && (
                      <Typography sx={{ color: "red" }}>
                        {errors?.files}
                      </Typography>
                    )}
                    {complaintInfo.files?.length > 0 && (
                      <Box sx={{ mt: 2, width: "100%" }}>
                        <Box display="flex" gap={2} mt={2}>
                          {complaintInfo?.files?.map((file, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                px: "10px",
                                py: "10px",
                                backgroundColor: "#f1f3f4",
                                borderRadius: "8px",
                                marginBottom: "8px",
                              }}
                            >
                              {file?.type?.startsWith("image/") &&
                              file?.preview ? (
                                <Box
                                  sx={{
                                    width: 60,
                                    height: 60,
                                    marginRight: "10px",
                                    borderRadius: "4px",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    src={file?.preview}
                                    alt={file?.name}
                                    style={{
                                      display: "block",
                                      maxWidth: "100%",
                                      maxHeight: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </Box>
                              ) : (
                                <AiOutlineFile
                                  size={34}
                                  style={{ marginRight: "10px" }}
                                />
                              )}
                              <Box sx={{ width: "100%", height: "auto" }}>
                                <Typography sx={{ fontSize: "12px" }}>
                                  {file?.name}
                                </Typography>
                                <Typography sx={{ fontSize: "12px" }}>
                                  {Math.round(file.size / 1024)} KB - uploaded
                                </Typography>
                                <Typography
                                  sx={{ fontSize: "12px", color: "#038F3E" }}
                                >
                                  {file?.type}
                                </Typography>
                              </Box>
                              <Box
                                size="small"
                                color="error"
                                onClick={() => removeFile(file)}
                                sx={{ marginLeft: "10px", cursor: "pointer" }}
                              >
                                <CancelOutlinedIcon />
                              </Box>
                            </Box>
                          ))}
                        </Box>
                        {complaintInfo.files.length === 5 && (
                          <Typography sx={{ color: "red" }}>
                            {`You can only upload a maximum of ${maxFiles} files`}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </FormControl>
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
                      mt: 4,
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
                      // href="/enrollee-form-preview"
                      onClick={handleNext}
                    >
                      Save & Continue
                    </Button>
                  </Box>
                  <Box sx={{ width: "20%", my: 2 }}>{btn}</Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SecondForm;

SecondForm.propTypes = {
  complaintInfo: PropTypes.shape({
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        preview: PropTypes.string,
      })
    ),
    // length: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
    programme: PropTypes.string,
    complaint: PropTypes.string,
    description: PropTypes.string,
  }),
  setComplaintInfo: PropTypes.func.isRequired,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  btn: PropTypes.any,
};
