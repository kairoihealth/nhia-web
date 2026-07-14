import { Box, Typography, TextField, Button, Link, Card } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { getSingleComplaintByCaseId } from "../../../services/general";
import { useHandleError } from "../../../hooks/useToastHandler";
import { useState } from "react";
import ComplaintStatusModal from "./ComplaintStatusModal";
import FormCardHeader from "../ComplaintForm/FormCardHeader";
import TwoColumnLayout from "../ComplaintForm/TwoColumnLayout";

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

const ReviewForm = () => {
  const handleError = useHandleError();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [complaintDetails, setComplaintDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCaseId(e.target.value);
  };

  const validateFields = () => {
    const newErrors = {};

    if (!caseId?.trim()) newErrors.caseId = "Complaint number is required";
    //format ENF/NHIA/BA/JUN26/0001
    else if (
      !/^[A-Z]{3}\/[A-Z]{3,4}\/[A-Z]{2}\/[A-Z]{3}\d{2}\/\d{4,}$/.test(caseId)
    ) {
      // else if (!/^KAI-\d{8}$/.test(caseId)) {
      newErrors.caseId =
        "Complaint number must be in the format AAA/BBB/CC/DDD11/0000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReviewComplaintStatus = async () => {
    if (!validateFields()) return;
    setIsSubmitting(true);

    try {
      const res = await getSingleComplaintByCaseId(encodeURIComponent(caseId));
      console.log(res, "res");
      setComplaintDetails(res);
      setCaseId("");
      setIsModalOpen(true);
    } catch (error) {
      handleError("Failed to send response:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(errors, "errors");

  return (
    <TwoColumnLayout
      title="Track Your Complaint"
      subtitle="Enter your Case ID to check the current status and history of your complaint."
      rightColumnSx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
      }}
    >
      <Card
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleReviewComplaintStatus();
        }}
        sx={{
          width: { xs: "100%", sm: "60%", md: "85%", lg: "56%" },
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",
          border: "1px solid #F0F0F0",
        }}
      >
        {/* Back Button */}
        <Link
          href="/"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: { xs: 2, md: 4 },
            gap: 1,
            color: "#000000",
            "&:hover": { color: "#027A3B" },
            width: "fit-content",
          }}
        >
          <FiArrowLeft sx={{ mr: 1 }} />
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24px",
              color: "#1B5E20",
            }}
          >
            Back
          </Typography>
        </Link>

        <FormCardHeader
          title="Track Your Complaint"
          subtitle="Track your complaints on the NHIA platform"
        />

        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              color: "#595959",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Case ID *
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="AAA/BBB/CC/DDD11/2222"
            value={caseId}
            onChange={handleChange}
            sx={textFieldStyles}
          />
          {errors.caseId && (
            <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
              {errors.caseId}
            </Typography>
          )}
        </Box>

        {/* Sample Format */}
        <Typography
          sx={{
            color: "#595959",
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: "21.6px",
          }}
        >
          Sent to you by email and SMS after submission
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "300px",
              height: "48px",
              backgroundColor: "#1B5E20",
              color: "#FFFFFF",
              textTransform: "capitalize",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              "&:hover": { backgroundColor: "#027A3B" },
            }}
            // disabled={isSubmitting}
            loading={isSubmitting}
          >
            Review Status
          </Button>
        </Box>
      </Card>
      <ComplaintStatusModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        complaint={complaintDetails}
      />
    </TwoColumnLayout>
  );
};

export default ReviewForm;
