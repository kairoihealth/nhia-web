import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FormControl,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { formControlStyles, textFieldStyles } from "../../utils/style";
import FormCardHeader from "../enrolees/ComplaintForm/FormCardHeader";
import { userSignup } from "../../services/auth/auth";
import TwoColumnLayout from "../enrolees/ComplaintForm/TwoColumnLayout";

const EnrolleeRegisterPage = () => {
  const navigate = useNavigate();
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    nhia_number: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required.";
    if (!formData.lastname.trim())
      newErrors.lastname = "Last name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        role: "Enrollee",
        is_staff: false,
      };
      console.log(payload, "formData");
      await userSignup(payload);
      handleSuccess("Registration successful! Please log in.");
      navigate("/login", { state: { from: "enrollee" } });
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TwoColumnLayout
      title="Create Your Enrollee Account"
      subtitle="Join the NHIA platform to manage your health insurance, submit complaints, and track their resolution."
      rightColumnSx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "90%", md: "85%", lg: "57%" },
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",
          border: "1px solid #F0F0F0",
        }}
      >
        <FormCardHeader
          title="Enrollee Registration"
          subtitle="Create an account to get started."
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
          >
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
                sx={{ color: "#595959", fontSize: "16px", fontWeight: 500 }}
              >
                First Name *
              </Typography>
              <TextField
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                error={!!errors.firstname}
                helperText={errors.firstname}
                placeholder="Enter your first name"
                sx={textFieldStyles}
                fullWidth
                required
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
                sx={{ color: "#595959", fontSize: "16px", fontWeight: 500 }}
              >
                Last Name *
              </Typography>
              <TextField
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                error={!!errors.lastname}
                helperText={errors.lastname}
                placeholder="Enter your last name"
                sx={textFieldStyles}
                fullWidth
                required
              />
            </Box>
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
              sx={{ color: "#595959", fontSize: "16px", fontWeight: 500 }}
            >
              Email Address *
            </Typography>
            <TextField
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="example@example.com"
              sx={textFieldStyles}
              fullWidth
              required
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
              sx={{ color: "#595959", fontSize: "16px", fontWeight: 500 }}
            >
              NHIA Number (Optional)
            </Typography>
            <TextField
              name="nhia_number"
              value={formData.nhia_number}
              onChange={handleChange}
              placeholder="Enter your NHIA number if you have one"
              sx={textFieldStyles}
              fullWidth
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
            <FormControl fullWidth error={!!errors.phone}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                Phone Number *
              </Typography>
              <PhoneInput
                country={"ng"}
                inputStyle={formControlStyles}
                value={formData.phone}
                onChange={handlePhoneChange}
              />
              {errors.phone && (
                <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                  {errors.phone}
                </Typography>
              )}
            </FormControl>
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
          >
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
                sx={{ color: "#595959", fontSize: "16px", fontWeight: 500 }}
              >
                Password *
              </Typography>
              <OutlinedInput
                name="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                fullWidth
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {passwordVisible ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={textFieldStyles}
              />
              {errors.password && (
                <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                  {errors.password}
                </Typography>
              )}
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
                sx={{ color: "#595959", fontSize: "16px", fontWeight: 500 }}
              >
                Confirm Password *
              </Typography>
              <OutlinedInput
                name="confirm_password"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                fullWidth
                value={formData.confirm_password}
                onChange={handleChange}
                error={!!errors.confirm_password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
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
                sx={textFieldStyles}
              />
              {errors.confirm_password && (
                <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                  {errors.confirm_password}
                </Typography>
              )}
            </Box>
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                mt: 2,
                height: "48px",
                borderRadius: "8px",
                backgroundColor: "#1B5E20",
                "&:hover": { backgroundColor: "#1B5E20" },
              }}
            >
              {isSubmitting ? "Registering..." : "Create Account"}
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography sx={{ textAlign: "center", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login", { state: { from: "enrollee" } });
              }}
              underline="hover"
              sx={{ color: "#1B5E20", fontWeight: 600, cursor: "pointer" }}
            >
              Log In
            </Link>
          </Typography>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              color: "#1B5E20",
              textTransform: "none",
              fontSize: "14px",
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

export default EnrolleeRegisterPage;
