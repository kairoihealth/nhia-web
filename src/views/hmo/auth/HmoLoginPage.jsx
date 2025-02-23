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
  OutlinedInput
} from "@mui/material";
import Logo from "../../../assets/nhia-logo.png";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#737373",
    border: "0.5px solid #DADADA",
    mb: 3,
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E", 
    },
  },
};
const HmoLoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {/* <Helmet>
        <title>Login to Your Account</title>
        <meta name="Login Page" content=" " />
        <link rel="canonical" href="/hmo-login-page" />
      </Helmet> */}
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
              px: 4,
              py: { xs: 4, md: 12 },
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
              Welcome Back
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
              {/* Email Field */}
              <Box
                flex={1}
                sx={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', gap: 1 }}
              >
                <Typography
                  sx={{
                    color: "#595959",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px"
                  }}
                >
                  Official Phone Number or Email Address
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  required
                  sx={textFieldStyles}
                />
              </Box>

              {/* Password Field */}
              <Box
                flex={1}
                sx={{ display: "flex", flexDirection: "column", alignItems: 'flex-start', gap: 1 }}
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
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder='Password'
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        passwordVisible ? 'hide the password' : 'display the password'
                                    }
                                    onClick={togglePasswordVisibility}
                                    edge="end"
                                >
                                    {passwordVisible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                </IconButton>
                            </InputAdornment>
                        }
                        // label="Password"
                  sx={{
                    ...textFieldStyles,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#038F3E", 
                    }
                  }}
                    />
              </Box>

              {/* Forgot Password Link */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", my: 3 }}>
                <Link
                  href="/hmo-forgot-password"
                  underline="hover"
                  color="error.main"
                >
                  Forgot Password?
                </Link>
              </Box>

              {/* Login Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ width: '394px', height: '45px', borderRadius: '50px', backgroundColor: '#038F3E', color: '#FFFFFF', fontSize: '16px', fontWeight: 500, lineHeight: '24px', mb: 3, py: '12px', px: '8px', textTransform: 'capitalize' }}
                href="/hmo-dashboard"
              >
                Login
              </Button>

              {/* Register Link */}
              <Typography sx={{fontSize: '16px', fontWeight: 500, lineHeight: '21.6px', color: '#595959'}} align="center">
                Do not have an account?&nbsp;
                <Link
                  href="/hmo-register-page"
                  underline="hover"
                  color="#038F3E"
                  sx={{fontSize: '16px', fontWeight: 500, lineHeight: '21.6px'}}
                >
                  Register Here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HmoLoginPage;
