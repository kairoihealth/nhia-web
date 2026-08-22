import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import { useState, useEffect } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { convertToBase64 } from "../../../utils/convertTobase64";
import { useQuery } from "@tanstack/react-query";
import { addComplaint } from "../../../services/general";
import {
  useHandleError,
  useHandleSuccess,
} from "../../../hooks/useToastHandler";
import {
  complaintCategories,
  complaintType,
  nhiaProgram,
} from "../../../mock/type";
import StakeholderSelect from "../../../shared/StakeholderSelect";
import {
  OTHERS_ISSUE,
  useAllowedRespondents,
  useComplaintIssues,
} from "../../../hooks/useComplaintIssues";
import { getSingleUser } from "../../../services/central";
import { getStates } from "../../../services/settings";

const multiLineStyles = {
  "& .MuiOutlinedInput-root": {
    minHeight: "150px",
    borderRadius: "8px",
    color: "#000000",
    "& .MuiOutlinedInput-input": {
      paddingTop: 0,
      paddingBottom: "16px",
      marginTop: 0,
      alignSelf: "flex-start",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1B5E20",
    },
  },
};

const CreateComplaint = () => {
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [formState, setFormState] = useState({
    // User details
    firstname: "",
    lastname: "",
    contact_address: "",
    nhia_number: "",
    // Complaint details
    description: "",
    otherDescription: "",
    complaint_type: "",
    complaint_category: "",
    complaint_against: "",
    incident_date: "",
    incident_time: "",
    nhia_programme: "",
    state: "",
    priority: "medium",
    hmo: "",
    provider: "",
    complainant_category: "Enrollee",
  });
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getSingleUser(userId),
    enabled: !!userId,
  });

  // The respondent is picked with a typeahead rather than a preloaded list —
  // the facility register is far too large to pull into a dropdown.
  const [selectedRespondent, setSelectedRespondent] = useState(null);

  useEffect(() => {
    if (user) {
      setFormState((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);

  // The issues on offer depend on the complainant/respondent pair, so they come
  // from the same schedule the API validates the submission against.
  const { issueOptions: mappedComplaintOptions, findIssue } = useComplaintIssues(
    formState.complainant_category,
    formState.complaint_against,
  );
  const { respondentOptions } = useAllowedRespondents(
    formState.complainant_category,
  );

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    const newState = { ...formState, description: value };
    // A listed issue carries its own domain, category and priority rating; only
    // "Others" leaves those to the complainant.
    if (value === OTHERS_ISSUE) {
      newState.complaint_type = "";
      newState.complaint_category = "";
      newState.priority = "medium";
    } else {
      const issue = findIssue(value);
      newState.complaint_type = issue?.complaint_type || "";
      newState.complaint_category = issue?.complaint_category || "";
      newState.priority = issue?.priority || "medium";
    }
    setFormState(newState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => {
      const next = { ...prev, [name]: value };
      // Switching who the complaint is against invalidates both the chosen
      // organisation and the issue picked from the old schedule.
      if (name === "complaint_against") {
        next.hmo = "";
        next.provider = "";
        next.description = "";
        next.complaint_type = "";
        next.complaint_category = "";
        setSelectedRespondent(null);
      }
      return next;
    });
  };

  const handleRespondentChange = (option) => {
    setSelectedRespondent(option);
    setFormState((prev) => ({
      ...prev,
      hmo: prev.complaint_against === "HMO" ? option?.value || "" : "",
      provider: prev.complaint_against === "Provider" ? option?.value || "" : "",
    }));
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (attachments.length + selectedFiles.length > 5) {
      handleError("You can only add up to 5 attachments.");
      return;
    }
    setAttachments((prev) => [
      ...prev,
      ...selectedFiles.map((file) => ({
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
      })),
    ]);
  };

  const handleAddAttachmentClick = () => {
    document.getElementById("file-input").click();
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (
      !formState.description ||
      !formState.complaint_type ||
      (formState.description === OTHERS_ISSUE && !formState.otherDescription)
    ) {
      return handleError("Please fill all required fields.");
    }

    setIsSubmitting(true);
    try {
      const docs = await Promise.all(
        attachments.map(async (attachment) => {
          const base64 = await convertToBase64(attachment.file);
          return { document: base64 };
        }),
      );

      const finalDescription =
        formState.description === OTHERS_ISSUE
          ? formState.otherDescription
          : formState.description;

      const payload = {
        ...formState,
        description: finalDescription,
        // The narrative and the issue picked off the schedule are stored apart.
        complaint_issue: formState.description,
        priority: formState.priority?.toLowerCase() || "medium",
        evidences: docs,
      };
      delete payload.image; // remove image from payload if it exists
      const res = await addComplaint(payload);

      handleSuccess(res.message || "Complaint submitted successfully!");
      navigate("/enrollee/complaints");
    } catch (error) {
      handleError(error, "Failed to submit complaint.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "#1B5E20", textTransform: "none" }}
      >
        Back to Complaints
      </Button>

      <Card
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: "12px",
          boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Your details (auto-filled)
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {isLoadingUser ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <TextField
              label="First Name"
              name="firstname"
              value={formState.firstname}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Last Name"
              name="lastname"
              value={formState.lastname}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="NHIA Number"
              name="nhia_number"
              value={formState.nhia_number}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Contact Address"
              name="contact_address"
              value={formState.contact_address}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        )}
      </Card>

      <Card
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: "12px",
          boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Complaint details
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box component="form" noValidate autoComplete="off">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr" },
              gap: 3,
            }}
          >
            <TextField
              select
              label="Complaint Against"
              name="complaint_against"
              value={formState.complaint_against}
              onChange={handleInputChange}
            >
              {respondentOptions.map((respondent) => (
                <MenuItem key={respondent.value} value={respondent.value}>
                  {respondent.label}
                </MenuItem>
              ))}
            </TextField>
            {(formState.complaint_against === "HMO" ||
              formState.complaint_against === "Provider") && (
              <Box>
                <Typography sx={{ fontSize: "13px", color: "#595959", mb: 0.5 }}>
                  {formState.complaint_against === "HMO"
                    ? "Select HMO"
                    : "Select Health Care Facility (HCF)"}
                </Typography>
                <StakeholderSelect
                  kind={formState.complaint_against}
                  value={selectedRespondent}
                  onChange={handleRespondentChange}
                />
              </Box>
            )}
            <TextField
              label="Date of Incident"
              name="incident_date"
              type="date"
              value={formState.incident_date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Time of Incident"
              name="incident_time"
              type="time"
              value={formState.incident_time}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="NHIA Programme"
              name="nhia_programme"
              value={formState.nhia_programme}
              onChange={handleInputChange}
            >
              {nhiaProgram.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="State of Incident"
              name="state"
              value={formState.state}
              onChange={handleInputChange}
            >
              {data?.results?.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <TextField
            select
            fullWidth
            required
            label="Description"
            name="description"
            value={formState.description}
            onChange={handleDescriptionChange}
            sx={{ mt: 3 }}
            disabled={!formState.complaint_against}
          >
            {mappedComplaintOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr" },
              gap: 3,
              mt: 3,
            }}
          >
            <TextField
              select
              label="Complaint Type"
              name="complaint_type"
              value={formState.complaint_type}
              onChange={handleInputChange}
              required
            >
              {complaintType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Complaint Category"
              name="complaint_category"
              value={formState.complaint_category}
              onChange={handleInputChange}
            >
              {complaintCategories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {formState.description === OTHERS_ISSUE && (
            <TextField
              fullWidth
              multiline
              required
              label="Complaint Description"
              name="otherDescription"
              value={formState.otherDescription}
              onChange={handleInputChange}
              sx={{ ...multiLineStyles, mt: 3 }}
              placeholder="Please describe your complaint in detail..."
            />
          )}
          <TextField
            fullWidth
            multiline
            label="Additional Information (Optional)"
            name="additional_information"
            value={formState.additional_information || ""}
            onChange={handleInputChange}
            sx={{ ...multiLineStyles, mt: 3 }}
            placeholder="Provide any other details here"
          />
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontWeight: 500, mb: 1 }}>Attachments</Typography>
            {attachments.length > 0 && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {attachments.map((attachment, index) => (
                  <Card
                    key={index}
                    sx={{
                      width: "120px",
                      borderRadius: "8px",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
                    }}
                  >
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
                        {attachment.type.includes("pdf") ? (
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
                          {attachment.name}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ position: "absolute", top: 4, right: 4 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveAttachment(index)}
                        sx={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Box>
                  </Card>
                ))}
              </Box>
            )}
            <Button
              startIcon={<AttachmentOutlinedIcon />}
              onClick={handleAddAttachmentClick}
              sx={{ color: "#1B5E20", textTransform: "none" }}
            >
              Add attachment
            </Button>
            <input
              accept=".pdf,.docx,.jpg,.jpeg,.png"
              multiple
              id="file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />{" "}
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {" "}
              You can upload up to 5 documents.{" "}
            </Typography>{" "}
          </Box>{" "}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              variant="contained"
              disabled={isSubmitting}
              onClick={handleSubmit}
              sx={{
                width: { xs: "80%", md: "30%" },
                backgroundColor: "#1B5E20",
                color: "#FFFFFF",
                fontWeight: 500,
                textTransform: "capitalize",
                padding: "10px 22px",
                borderRadius: "50px",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit Complaint"
              )}
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default CreateComplaint;
