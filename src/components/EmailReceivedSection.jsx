import{ useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  OutlinedInput,
  IconButton,
  // Link,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";

const EmailReceivedSection = ({
  showVerification,
  handleResendEmail,
  handleBackToLogin,
  setShowVerification,
  handleVerifyEmail,
}) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [error, setError] = useState("");

  // Validate the code
  const isValidCode = (code) => {
    const codeRegex = /^\d{4}$/; // Ensure the code is exactly 4 digits
    return codeRegex.test(code.join(""));
  };

  // Handle input changes
  const handleChange = useCallback((index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }, [code]);

  // Handle backspace key
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle verification
  const handleVerify = () => {
    if (!isValidCode(code)) {
      setError("Please enter a valid 4-digit code.");
      return;
    }
    setError("");
    handleVerifyEmail(); 
  };

  return (
    <>
      {/* Header */}
      <Typography  align="center" color="#038F3E" sx={{fontSize: '32px', fontWeight: 500, lineHeight: '43.2px'}} gutterBottom>
        Check your email
      </Typography>
      <Typography align="center" sx={{fontSize: '16px', fontWeight: 500, lineHeight: '21.6px', color: '#475467', mb: 3 }}>
        We sent a verification link to <br /> example@example.com
      </Typography>

      {/* Show Code Input or Manual Entry Button */}
      {showVerification ? (
        <>
          {/* Code Input Fields */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
            }}
          >
            {code.map((digit, index) => (
              <OutlinedInput
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center" },
                }}
                sx={{
                  width: "56px",
                  height: "56px",
                  mx: 1,
                  "& .MuiOutlinedInput-input": {
                    fontSize: "24px",
                    padding: "8px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#038F3E", // Green border color
        },
                }}
              />
            ))}
          </Box>

          {/* Error Message */}
          {error && (
            <Typography variant="caption" align="center" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Verify Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleVerify}
            sx={{width: '360px', height: '56px', py: '10px', px: '18px', borderRadius: '50px', backgroundColor: "#038F3E", my: 3, textTransform: 'none' }}
          >
            Verify email
          </Button>

          {/* Resend Email Link */}
          <Typography align="center" sx={{fontSize: '14px', fontWeight: 400, lineHeight: '20px', color: '#475467'}}>
            Didn&apos;t receive the email?{" "}
            <span
              style={{ fontWeight: 500, cursor: "pointer", color: "#038F3E" }}
              onClick={handleResendEmail}
            >
              Click to resend.
            </span>
          </Typography>


           {/* Back to Login Link */}
           <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              cursor: "pointer",
              gap: .1,
            }}
            onClick={handleBackToLogin}
          >
            <IconButton>
              <ArrowBackIcon sx={{ color: "#475467" }} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "20px",
                color: "#475467",
              }}
            >
              Back to login
            </Typography>
          </Box>
        </>
      ) : (
        <>
          {/* Enter Code Manually Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setShowVerification(true)}
            sx={{width: '360px', height: '56px', py: '10px', px: '18px', borderRadius: '50px', backgroundColor: "#038F3E", my: 3, textTransform: 'none' }}
          >
            Enter code manually
          </Button>

          {/* Back to Login Link */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              gap: .1,
            }}
            onClick={handleBackToLogin}
          >
            <IconButton>
              <ArrowBackIcon sx={{ color: "#475467" }} />
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "20px",
                color: "#475467",
              }}
            >
              Back to login
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

EmailReceivedSection.propTypes = {
  showVerification: PropTypes.bool.isRequired,
  handleResendEmail: PropTypes.func.isRequired,
  handleBackToLogin: PropTypes.func.isRequired,
  setShowVerification: PropTypes.func.isRequired,
  handleVerifyEmail: PropTypes.func.isRequired,
};

export default EmailReceivedSection;