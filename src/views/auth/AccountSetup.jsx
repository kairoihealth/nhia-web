import { useState } from "react";
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
  FormControl,
} from "@mui/material";
import Logo from "../../assets/nhia-logo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { validateAccountForm } from "../../utils/accountValidation";
import { formControlStyles, textFieldStyles } from "../../utils/style";
import { acceptInvitation } from "../../services/general";
import { setUpAccount } from "../../services/auth/auth";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AccountSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [, setDecodedToken] = useState(null);
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(
          "tJXnXPv1Lq11fXU7seDLa7l8tizuHK5S7tXe4DRRmiVW7a67VBDhwGxpdBBF9tMD70iLURC0FKVbUdbnQXY0XmCCMHAOsAzrgptCnOmGgLvIqkqb7Mo64xJcrzcvvj2we7dehh2x3uke8j1s176579"
        );
        setDecodedToken(decoded);
        setFormData((prevFormData) => ({
          ...prevFormData,
          email: decoded.email || "",
        }));
      } catch (error) {
        console.error("Error decoding token:", error);
        handleError("Invalid or expired invitation link.", error);
        // navigate("/login");
      }
    } else {
      handleError("No invitation link provided.", null);
      navigate("/login");
    }
  }, []);

  console.log(formData, "formData");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { isValid, errors: validationErrors } =
        validateAccountForm(formData);

      if (!isValid) {
        setErrors(validationErrors);
        return;
      }
      console.log(isValid, validationErrors, "isValid");

      const token = new URLSearchParams(location.search).get("token") || "";

      const payload = {
        token: token,
        email: formData.email,
        firstname: formData.firstName,
        lastname: formData.lastName,
        phone: formData.phone,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      };

      await setUpAccount(payload);
      // await acceptInvitation(payload);
      handleSuccess("Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      handleError("Registration failed. Please try again.", error);
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
              Setup your account
            </Typography>
            <Box component="form" sx={{ mt: 3 }}>
              {/* HMO Name Field */}
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
                  First name
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type="text"
                  name="firstName"
                  placeholder="Jessica"
                  required
                  sx={textFieldStyles}
                  onChange={handleChange}
                  value={formData.firstName}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Box>

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
                  Last name
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  type="text"
                  name="lastName"
                  placeholder="Jessica"
                  required
                  sx={textFieldStyles}
                  onChange={handleChange}
                  value={formData.lastName}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Box>

              {/* Email Field */}
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
                  error={!!errors.email}
                  helperText={errors.email}
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
                  mb: 3,
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
                  Official Phone Number
                  <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
                </Typography>
                <FormControl fullWidth>
                  <PhoneInput
                    country={"ng"}
                    name="phone"
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone })}
                    // inputStyle={formControlStyles}
                    inputStyle={{
                      ...formControlStyles,
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#038F3E",
                      },
                    }}
                    // onChange={handleChange}
                  />
                </FormControl>
                {errors.phone && (
                  <Typography variant="caption" color="error">
                    {errors.phone}
                  </Typography>
                )}
              </Box>

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
                  id="outlined-adornment-password"
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
                  id="outlined-adornment-password"
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
                <Link href="/login" underline="hover" color="#038F3E">
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

export default AccountSetup;
