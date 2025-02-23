import { useState } from "react";
// import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  // Typography,
  // Button,
  // Link,
  // Stack,
  // IconButton,
} from "@mui/material";
import EmailReceived from "../assets/mail-icon.png";
import EmailVerified from "../assets/check-icon.png";
import EmailReceivedSection from "./EmailReceivedSection";
import EmailVerifiedSection from "./EmailVerifiedSection";

const EmailVerification = () => {
  const [showVerification, setShowVerification] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleVerifyEmail = () => {
    // Simulate email verification logic
    setEmailVerified(true);
  };

  const handleResendEmail = () => {
    // Logic to resend email verification
  };

  const handleBackToLogin = () => {
    setShowVerification(true);
    setEmailVerified(false);
  };

  const moveToNextInput = (event) => {
    const maxLength = parseInt(event.target.getAttribute("maxLength"));
    const inputLength = event.target.value.length;
    if (inputLength >= maxLength) {
      const nextInput = event.target.nextElementSibling;
      if (nextInput && nextInput.tagName === "INPUT") {
        nextInput.focus();
      }
    }
    if (event.inputType === "deleteContentBackward" && inputLength === 0) {
      const previousInput = event.target.previousElementSibling;
      if (previousInput && previousInput.tagName === "INPUT") {
        previousInput.focus();
      }
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>Email Verification</title>
        <meta name="Email Verification Page" content=" " />
        <link rel="canonical" href="/email-verification" />
      </Helmet> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          height: "100vh", 
          backgroundColor: "#ffffff",
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              p: 4,
              backgroundColor: "#ffffff",
              textAlign: "center",
              width: "100%",
              maxWidth: 500,
              borderRadius: "8px",
              // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Display appropriate image based on state */}
            {emailVerified ? (
              <img
                src={EmailVerified}
                alt="Email Verified"
                style={{ margin: "auto", display: "block", marginBottom: "20px" }}
              />
            ) : (
              <img
                src={EmailReceived}
                alt="Email Received"
                style={{ margin: "auto", display: "block", marginBottom: "20px" }}
              />
            )}

            {/* Render appropriate section based on state */}
            {emailVerified ? (
              <EmailVerifiedSection
                handleResendEmail={handleResendEmail}
                handleBackToLogin={handleBackToLogin}
              />
            ) : (
              <EmailReceivedSection
                showVerification={showVerification}
                handleResendEmail={handleResendEmail}
                handleBackToLogin={handleBackToLogin}
                setShowVerification={setShowVerification}
                handleVerifyEmail={handleVerifyEmail}
                moveToNextInput={moveToNextInput}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default EmailVerification;