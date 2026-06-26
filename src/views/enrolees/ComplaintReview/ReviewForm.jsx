import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  //   Stack,
} from "@mui/material";
import Logo from "../../../assets/nhia-logo.png";
import KairoiLogo from "../../../assets/kairoi-logo.png";
import { FiArrowLeft } from "react-icons/fi";
import { getSingleComplaintByCaseId } from "../../../services/general";
import { useHandleError } from "../../../hooks/useToastHandler";
import { useState } from "react";
import ComplaintStatusModal from "./ComplaintStatusModal";

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
    <Box
      sx={{
        display: { xs: "column", md: "flex" },
        height: "100vh",
        m: 0,
        p: 0,
      }}
    >
      {/* Left Column */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          backgroundColor: "#038F3E",
          color: "#fff",
          p: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: { xs: "center", md: "flex-start" },
          position: "relative",
          height: { xs: "auto", md: "100vh" },
        }}
      >
        <Box>
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{ width: { xs: "70px", md: "100px" } }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "32px", md: "58px" },
              fontWeight: 600,
              lineHeight: { xs: "43.2px", md: "68.3px" },
              mt: { xs: 2, md: 5 },
              textAlign: { xs: "center", md: "left" },
              width: { xs: "357px", md: "90%" },
            }}
          >
            Welcome to NHIA Complaint Management System
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 400,
              lineHeight: { xs: "27px", md: "32.4px" },
              mt: 3,
              textAlign: { xs: "center", md: "left" },
              width: { xs: "90%", md: "90%" },
            }}
          >
            Welcome aboard! Your complaints fuel our quest for service
            perfection.
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            alignItems: "flex-end",
            mt: 5,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "32.4px" }}
            >
              Powered by
            </Typography>
            <Box
              component="img"
              src={KairoiLogo}
              alt="KairoiLogo"
              sx={{ width: "70px" }}
            />
          </Box>
        </Box>
      </Box>

      {/* Right Column */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleReviewComplaintStatus();
        }}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between",
          py: { xs: 4, md: 4 },
          px: { xs: 3, md: 6 },
          backgroundColor: "#FAFAFA",
        }}
      >
        {/* Back Button */}
        <Link
          href="/"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            mb: { xs: 2, md: 10 },
            gap: 1,
            color: "#000000",
            "&:hover": { color: "#027A3B" },
          }}
        >
          <FiArrowLeft sx={{ mr: 1 }} />
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24px",
              color: "#038F3E",
            }}
          >
            Back
          </Typography>
        </Link>

        {/* Title */}
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "43.2px",
            textAlign: "left",
            color: "#038F3E",
            mb: 3,
          }}
        >
          Review of existing complaint or request
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            width: { xs: "100%", md: "90%" },
            color: "#595959",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: "24.3px",
            mb: { xs: 4, md: 10 },
          }}
        >
          Track and manage your complaints on the NHIA platform at your
          fingertips.
        </Typography>

        {/* Complaint Number Input */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "80%" },
            gap: 1,
          }}
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
              Input your case ID to get an update
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
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "21.6px",
            }}
          >
            Sample: AAA/BBB/CC/DDD11/2222
          </Typography>
        </Box>

        {/* Review Status Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "300px",
              height: "48px",
              backgroundColor: "#038F3E",
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
      </Box>
      <ComplaintStatusModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        complaint={complaintDetails}
      />
    </Box>
  );
};

export default ReviewForm;
