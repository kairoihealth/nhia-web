import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import Logo from "../assets/nhia-logo.png";
import "react-phone-input-2/lib/style.css";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useHandleError, useHandleSuccess } from "../hooks/useToastHandler";
import { validatePasswordResetForm } from "../utils/accountValidation";
import { textFieldStyles } from "../utils/style";
import { userResetPassword } from "../services/auth/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  //   const [, setDecodedToken] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const token = searchParams.get("token");

  //   console.log(token, "tokennn");
  //   if (token) {
  //     try {
  //       // const decoded = jwtDecode(token);
  //       const res = verifyInviteToken(token);
  //       console.log(res, "decoded token");
  //       // setDecodedToken(decoded);
  //       // setFormData((prevFormData) => ({
  //       //   ...prevFormData,
  //       //   email: decoded.email || "",
  //       // }));
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //       handleError("Invalid or expired invitation link.", error);
  //       // navigate("/login");
  //     }
  //   } else {
  //     handleError("No invitation link provided.", null);
  //     navigate("/login");
  //   }
  // }, [location.search, navigate]);

  console.log(formData, "formData");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { isValid, errors: validationErrors } =
        validatePasswordResetForm(formData);

      if (!isValid) {
        setErrors(validationErrors);
        return;
      }
      console.log(isValid, validationErrors, "isValid");

      const token = new URLSearchParams(location.search).get("token") || "";

      const payload = {
        token: token,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      };

      await userResetPassword(payload);
      // await acceptInvitation(payload);
      handleSuccess("Password reset successful!");
      setFormData({
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      handleError(error || "Password reset failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#038F3E",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 2, md: 6 },
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
              borderRadius: "25px",
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
                mt: 2,
              }}
              gutterBottom
            >
              Reset your password
            </Typography>
            <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
              {/* Password Field */}
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
                  Password
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <OutlinedInput
                  id="password"
                  name="password"
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
                      borderColor: "#038F3E",
                    },
                  }}
                  onChange={handleChange}
                  error={!!errors.password}
                />
                {errors.password && (
                  <Typography variant="caption" color="error">
                    {errors.password}
                  </Typography>
                )}
              </Box>

              {/* Confirm Password Field */}
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
                  Confirm Password
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <OutlinedInput
                  id="confirmPassword"
                  name="confirmPassword"
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
                      borderColor: "#038F3E",
                    },
                  }}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <Typography variant="caption" color="error">
                    {errors.confirmPassword}
                  </Typography>
                )}
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
                  textTransform: "capitalize",
                }}
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ResetPassword;
