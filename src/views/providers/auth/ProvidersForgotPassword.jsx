// import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button
  // Link
} from "@mui/material";
import Logo from "../../../assets/nhia-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#000000",
    border: "0.5px solid #DADADA",
    mb: 3
  }
};
const ProvidersForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    navigate(
      `/email-verification?from=forgot-password&email=${encodeURIComponent(
        email
      )}`
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#038F3E",
          height: "100vh"
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
              borderRadius: "25px"
            }}
          >
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ width: { xs: "70px", md: "74.64px" } }}
            />
            <Typography variant="h5" color="#038F3E" gutterBottom>
              Forgot Password
            </Typography>
            {/* <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              To reset your password, enter the email address you used to register your account. A 4-digit code would be sent to this address.
            </Typography> */}
            <Box component="form" sx={{ mt: 3 }}>
              {/* Email Field */}
              <Box
                flex={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1
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
                  Email Address
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  required
                  sx={textFieldStyles}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              {/* Send Reset Password Code Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  width: "394px",
                  height: "45px",
                  borderRadius: "50px",
                  backgroundColor: "#038F3E",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  mb: 3,
                  py: "12px",
                  px: "8px",
                  textTransform: "capitalize"
                }}
                onClick={handleSubmit}
              >
                Reset Password
              </Button>

              {/* Register Link */}
              {/* <Typography variant="body2" align="center">
                Do not have an account?&nbsp;
                <Link
                  href="/providers-register-page"
                  underline="hover"
                  color="#038F3E"
                >
                  Register Here
                </Link>
              </Typography> */}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProvidersForgotPassword;
