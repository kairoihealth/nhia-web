// import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Checkbox,
  Button
  // Link,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ProfileImage from "../../../assets/profile-img.png";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useState } from "react";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#737373",
    border: "0.5px solid #DADADA",
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
  color: "#737373",
  border: "0.5px solid #DADADA",
  paddingY: "34px",
  fontSize: "16px",
  outline: "none"
};

const permissions = [
  {
    label: "View and manage complaints, no authority to delete.",
    checked: true
  },
  {
    label: "Generate and view reports, no permission to modify.",
    checked: true
  },
  {
    label: "Adjust user details, no permission to add or remove users.",
    checked: true
  },
  {
    label: "View settings, but cannot make significant changes.",
    checked: true
  }
];

const ProvidersProfile = () => {
  // const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!passwordVisible);
  // };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Box>
      {/* <Helmet>
        <title>Providers Profile</title>
        <meta name="Providers Profile" content=" " />
        <link rel="canonical" href="/" />
      </Helmet> */}

      {/* Main Layout */}
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#FAFAFA",
          height: "100vh"
        }}
      >
        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {/* Sub Content */}
          <Box sx={{ mt: 2 }}>
            {/* Title */}
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                textTransform: "none",
                color: "#101828"
              }}
              gutterBottom
            >
              Profile
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
              {/* Profile Image and Details */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 2,
                  mb: 4
                }}
              >
                <Box>
                  <img
                    src={ProfileImage}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "16px"
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: 500,
                      lineHeight: "28px",
                      color: "#071C42"
                    }}
                  >
                    Oyinkansola Shoroye
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      color: "#304262"
                    }}
                  >
                    Admin I
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      width: "144px",
                      height: "42px",
                      borderRadius: "12px",
                      backgroundColor: "#20201E",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      textTransform: "none",
                      color: "#F2F2F2"
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Box>

              <form>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                >
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      First Name
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="enter first name"
                      sx={textFieldStyles}
                    />
                  </Box>
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="enter last name"
                      sx={textFieldStyles}
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                  mt={2}
                >
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Middle Name
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="enter middle name"
                      sx={textFieldStyles}
                    />
                  </Box>
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Phone Number
                    </Typography>
                    <FormControl fullWidth>
                      <PhoneInput
                        country={"ng"}
                        inputStyle={formControlStyles}
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                  mt={2}
                >
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
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
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      type="email"
                      placeholder="example@example.com"
                      sx={textFieldStyles}
                    />
                  </Box>
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Designation
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="e.g H23 dolphin estate"
                      sx={textFieldStyles}
                    />
                  </Box>
                </Box>
              </form>
            </Box>

            {/* Form Section */}
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3
              }}
            >
              {/* Security Section */}
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 500,
                  lineHeight: "32.4px",
                  textTransform: "none",
                  color: "#038F3E",
                  mt: 5
                }}
              >
                Security
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Current Password */}
                <Box
                  flex={1}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    width: "49%"
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
                    Enter your current password
                    <span style={{ color: "#099243", marginLeft: "6px" }}>
                      *
                    </span>
                  </Typography>
                  <TextField
                    type="password"
                    variant="outlined"
                    required
                    placeholder="enter your password"
                    sx={textFieldStyles}
                    slotProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleConfirmPasswordVisibility}>
                            {confirmPasswordVisible ? (
                              <VisibilityOffOutlined />
                            ) : (
                              <VisibilityOutlined />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#595959",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px"
                    }}
                  >
                    Can&apos;t remember your password?
                  </Typography>
                </Box>

                {/* New Password and Confirm Password */}
                <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      New Password
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      fullWidth
                      type="password"
                      variant="outlined"
                      required
                      placeholder="enter first name"
                      sx={textFieldStyles}
                      slotProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={toggleConfirmPasswordVisibility}
                            >
                              {confirmPasswordVisible ? (
                                <VisibilityOffOutlined />
                              ) : (
                                <VisibilityOutlined />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Confirm new password
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      fullWidth
                      type="password"
                      variant="outlined"
                      required
                      placeholder="enter first name"
                      sx={textFieldStyles}
                      slotProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={toggleConfirmPasswordVisibility}
                            >
                              {confirmPasswordVisible ? (
                                <VisibilityOffOutlined />
                              ) : (
                                <VisibilityOutlined />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Permission Section */}
              <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 500,
                    lineHeight: "32.4px",
                    textTransform: "none",
                    color: "#038F3E",
                    mt: 5
                  }}
                >
                  Permissions
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: 500,
                      lineHeight: "28px",
                      textTransform: "none",
                      color: "#071C42",
                      mb: 1
                    }}
                  >
                    Oyinkansola Shoroye
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      textTransform: "none",
                      color: "#304262",
                      mb: 2
                    }}
                  >
                    Admin II
                  </Typography>
                  {permissions.map((permission, index) => (
                    <Typography
                      key={index}
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "28px",
                        color: "#595959"
                      }}
                    >
                      <Checkbox
                        defaultChecked={permission.checked}
                        sx={{
                          "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                            color: "#000000" 
                          },
                          color: "#000000"
                        }}
                      />
                      {permission.label}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProvidersProfile;
