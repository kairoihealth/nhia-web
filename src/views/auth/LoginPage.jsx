import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import Logo from "../../assets/nhia-logo.png";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
// import { mockLogin } from "../../mock/mockAuth";
import { userLogin } from "../../services/auth/auth";
import { jwtDecode } from "jwt-decode";
import { useHandleError } from "../../hooks/useToastHandler";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#737373",
    border: "0.5px solid #DADADA",
    mb: 3,
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E"
    }
  }
};
const LoginPage = () => {
  const navigate = useNavigate();
  const handleError = useHandleError();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await userLogin(email, password);
      const accessToken = response.data.access;

      // Decode the access token
      const decodedToken = jwtDecode(accessToken);
      // console.log("Decoded Token:", decodedToken);

      const role = decodedToken.role;
      const username = decodedToken.name;
      // console.log("Role:", role);
      // Assuming role is in response.data.role
      localStorage.setItem("userRole", role);
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("fullname", username);
      // console.log("Token stored:", accessToken);
      // console.log("LocalStorage after login:", localStorage);
      navigate(`/${role.toLowerCase()}/dashboard`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        handleError(err.response.data.message);
      } else {
        setError("Invalid credentials! Please try again.");
      }
    }
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                />
              </Box>

              {/* Forgot Password Link */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", my: 3 }}>
                <Link
                  href="/forgot-password"
                  underline="hover"
                  color="error.main"
                >
                  Forgot Password?
                </Link>
              </Box>

              {/* Login Button */}
              <Button
                variant="contained"
                fullWidth
                sx={{
                  width: "394px",
                  height: "45px",
                  borderRadius: "50px",
                  backgroundColor: email && password ? "#038F3E" : "grey",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  mb: 3,
                  py: "12px",
                  px: "8px",
                  textTransform: "capitalize"
                }}
                disabled={!email || !password}
                onClick={handleLogin}
              >
                Login
              </Button>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
