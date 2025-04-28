import { useState } from "react";
// import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  OutlinedInput,
  FormControl
} from "@mui/material";
import Logo from "../../../assets/nhia-logo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#000000",
    border: "0.5px solid #DADADA",
    mb: 3,
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E"
    }
  }
};

const formControlStyles = {
  width: "100%",
  height: "55px",
  borderRadius: "8px",
  backgroundColor: "#F5F5F5",
  color: "#000000",
  border: "0.5px solid #DADADA",
  paddingY: "34px",
  fontSize: "16px",
  outline: "none"
};
const HmoRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for registration
    if (formData.password === formData.confirmPassword && formData.email) {
      alert("Registration Successful!");
      navigate("/email-verification");
    } else {
      alert("Please ensure all fields are filled correctly.");
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>Register a New Account</title>
        <meta name="Register Page" content=" " />
        <link rel="canonical" href="/hmo-register-page" />
      </Helmet> */}
      <Box
        sx={{
          backgroundColor: "#038F3E",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 2, md: 6 }
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              p: 4,
              backgroundColor: "#ffffff",
              textAlign: "center",
              width: "100%",
              maxWidth: "720px",
              borderRadius: "25px"
            }}
          >
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ width: { xs: "70px", md: "74.64px" } }}
            />
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "32.4px",
                color: "#038F3E",
                mt: 2
              }}
              gutterBottom
            >
              Create your account
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
              {/* HMO Name Field */}
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
                  HMO&apos;s Name
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type="text"
                  name="fullName"
                  placeholder="Jessica"
                  required
                  sx={textFieldStyles}
                  onChange={handleChange}
                />
              </Box>

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
                  Official Email Address
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  required
                  sx={textFieldStyles}
                  onChange={handleChange}
                />
              </Box>

              {/* Phone Number Field */}
              <Box
                flex={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                  mb: 3
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
                  Official Phone Number
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <FormControl fullWidth>
                  <PhoneInput
                    country={"ng"}
                    // inputStyle={formControlStyles}
                    inputStyle={{
                      ...formControlStyles,
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#038F3E"
                      }
                    }}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>

              {/* Password Field */}
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
                  Password
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="********"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          passwordVisible
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {passwordVisible ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  // label="Password"
                  sx={{
                    ...textFieldStyles,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#038F3E"
                    }
                  }}
                  onChange={handleChange}
                />
              </Box>

              {/* Confirm Password Field */}
              <Box
                flex={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                  my: 2
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
                  Confirm Password
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="*********"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          confirmPasswordVisible
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {confirmPasswordVisible ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  // label="Password"
                  sx={{
                    ...textFieldStyles,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#038F3E"
                    }
                  }}
                  onChange={handleChange}
                />
              </Box>

              {/* Create Account Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  width: "347px",
                  height: "45px",
                  borderRadius: "50px",
                  backgroundColor: "#038F3E",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  my: 3,
                  py: "12px",
                  px: "8px",
                  textTransform: "capitalize"
                }}
                type="submit"
                onClick={handleSubmit}
              >
                Create Account
              </Button>

              {/* Terms and Privacy Policy */}
              <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                By signing up you agree to our{" "}
                <Link href="/" underline="hover" color="error.main">
                  Terms
                </Link>{" "}
                &amp;{" "}
                <Link href="/" underline="hover" color="error.main">
                  Privacy Policy Statement
                </Link>
              </Typography>

              {/* Login Link */}
              <Typography variant="body2" align="center">
                I have an account?&nbsp;
                <Link href="/login-page" underline="hover" color="#038F3E">
                  Log In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HmoRegisterPage;
