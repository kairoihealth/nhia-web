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
import { mockLogin } from "../../mock/mockAuth";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const role = mockLogin(email, password);
    console.log(role);

    if (role) {
      navigate(`/${role}/dashboard`); // Redirect to user's dashboard
    } else {
      setError("Invalid credentials! Please try again.");
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
