import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  OutlinedInput,
  Card,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { userLogin } from "../../services/auth/auth";
import { jwtDecode } from "jwt-decode";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { textFieldStyles } from "../../utils/style";
import Auth from "../../utils/Auth";
import { getSingleUserWithToken } from "../../services/central";
import { useAuth } from "../../components/auth/AuthContext";
import TwoColumnLayout from "../enrolees/ComplaintForm/TwoColumnLayout";
import FormCardHeader from "../enrolees/ComplaintForm/FormCardHeader";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAuthPermissions } = useAuth();

  const from = location.state?.from;

  const title =
    from === "enrollee"
      ? "Track and manage your complaints"
      : "Admin Portal";

  const subtitle =
    from === "enrollee"
      ? "Log in to view your coverage, submit complaints, and track resolutions."
      : "For NHIA officers, HMO representatives, and healthcare providers managing complaints.";

  const cardTitle =
    from === "enrollee" ? "Enrollee Login" : "Admin & Partner Login";
  const cardSubtitle =
    from === "enrollee"
      ? "Enter your credentials to access your portal."
      : "For authorized personnel only.";

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await userLogin(email, password);
      if (response.status === 200) {
        const successMessage = response.data.detail || "Login successful";
        handleSuccess(successMessage);
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;

        // Decode the access token
        const decodedToken = jwtDecode(accessToken);

        const role = decodedToken.role;
        const username = decodedToken.name || "";
        const userId = decodedToken.user_id;
        localStorage.setItem("userRole", role);
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("fullname", username);
        localStorage.setItem("userId", userId);
        const userDetails = await getSingleUserWithToken(userId, accessToken);
        console.log(userDetails, "userDetails");
        if (userDetails?.admin_status?.permissions) {
          setAuthPermissions(userDetails?.admin_status?.permissions);
          // localStorage.setItem(
          //   "permissions",
          //   JSON.stringify(userDetails?.admin_status?.permissions),
          // );
        }
        if (userDetails?.state?.id) {
          localStorage.setItem("stateId", userDetails?.state?.id);
        }
        if (userDetails?.hmo?.id) {
          localStorage.setItem("hmoId", userDetails?.hmo?.id);
        }
        if (userDetails?.provider?.id) {
          localStorage.setItem("providerId", userDetails?.provider?.id);
        }

        Auth.setToken(accessToken);

        navigate(`/${role.toLowerCase()}/dashboard`);
      } else if (response && response.detail) {
        console.log("Login Response Status:", response.detail);
        handleError(response); // Provide a title for the error toast
      } else {
        const errorMessage = "Failed to login";
        handleError(errorMessage); // Provide a title for the error toast
      }
    } catch (err) {
      const data = err?.response?.data;
      handleError(
        {},
        data?.message ||
          data?.detail ||
          err?.message ||
          "Unable to log in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TwoColumnLayout
      title={title}
      subtitle={subtitle}
      rightColumnSx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: { xs: "90%", md: "85%", lg: "57%" },
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",
          border: "1px solid #F0F0F0",
        }}
      >
        <FormCardHeader title={cardTitle} subtitle={cardSubtitle} />
        <Box sx={{ textAlign: "center" }}>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
            {/* Email Field */}
            <Box
              flex={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {/* Official Phone Number or Email Address */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>

            {/* Password Field */}
            <Box
              flex={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1,
                my: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
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
                    borderColor: "#1B5E20",
                  },
                }}
              />
              {errors.password && (
                <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                  {errors.password}
                </Typography>
              )}
            </Box>

            {/* Forgot Password Link */}
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mb: 3, mt: 1 }}
            >
              <Link
                href="/forgot-password"
                underline="hover"
                color="#388E3C"
                fontFamily="Inter"
              >
                Forgot Password?
              </Link>
            </Box>

            {/* Login Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                // maxWidth: "394px",
                width: "100%",
                height: "45px",
                borderRadius: "50px",
                backgroundColor: email && password ? "#1B5E20" : "grey",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                py: "12px",
                px: "8px",
                textTransform: "capitalize",
              }}
              type="submit"
              disabled={!email || !password}
              loading={isSubmitting}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          {from === "enrollee" && (
            <Typography
              sx={{ textAlign: "center", fontSize: "13px", color: "#6B6B6B" }}
            >
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                underline="hover"
                sx={{ color: "#388E3C", fontWeight: 600, cursor: "pointer" }}
              >
                Register Here
              </Link>
            </Typography>
          )}
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              color: "#388E3C",
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(27, 94, 32, 0.04)",
              },
            }}
          >
            Back to home
          </Button>
        </Box>
      </Card>
    </TwoColumnLayout>
  );
};

export default LoginPage;
