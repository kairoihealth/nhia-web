// import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  // Checkbox,
  Button,
  // Link,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ProfileImage from "../../../assets/profile-img.png";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getSingleUser, userUpdateProfile } from "../../../services/central";
import { useQuery } from "@tanstack/react-query";
import {
  useHandleError,
  useHandleSuccess,
} from "../../../hooks/useToastHandler";
import { userChangePassword } from "../../../services/auth/auth";

const textFieldStyles = {
  width: "100%",

  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#000000",
    border: "0.5px solid #DADADA",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E",
    },
  },
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
  outline: "none",
};

// const permissions = [
//   {
//     label: "View and manage complaints, no authority to delete.",
//     checked: true,
//   },
//   {
//     label: "Generate and view reports, no permission to modify.",
//     checked: true,
//   },
//   {
//     label: "Adjust user details, no permission to add or remove users.",
//     checked: true,
//   },
//   {
//     label: "View settings, but cannot make significant changes.",
//     checked: true,
//   },
// ];

const getUserRole = () => localStorage.getItem("userRole");
const getUsername = () => localStorage.getItem("fullname");
const getUserId = () => localStorage.getItem("userId");

const ProvidersProfile = () => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();
  const [isCurrentlySubmitting, setIsCurrentlySubmitting] = useState(null);
  const userRole = getUserRole();
  const fullname = getUsername();
  const userId = getUserId();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  // const [toggleEditProfile, setToggleEditProfile] = useState(false);
  const [profileValues, setProfileValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    image: "",
    // middlename: "",
    // designation: "",
  });
  const [passwordValues, setPassowrdValues] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getSingleUser(userId),
  });

  useEffect(() => {
    if (user) {
      setProfileValues({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phone: user.phone || "",
        email: user.email || "",
        image: user.image,
        // middlename: user.middlename || "",
        // designation: user.designation || "",
      });
    }
  }, [user]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleUpdateProfile = async () => {
    setIsCurrentlySubmitting("profile");
    try {
      let res = await userUpdateProfile({ id: userId, payload: profileValues });
      console.log(res, "sss");
      localStorage.setItem(
        "fullname",
        res.data.data?.firstname + " " + res.data.data?.lastname
      );
      handleSuccess(res.data?.message || "Response sent successfully");
      window.location.reload();
    } catch (error) {
      handleError("Failed to send response:", error);
    } finally {
      setIsCurrentlySubmitting(null);
    }
  };

  const handleChangePassword = async () => {
    setIsCurrentlySubmitting("password");
    try {
      let res = await userChangePassword(passwordValues);

      handleSuccess(res.data?.message || "Response sent successfully");
      setPassowrdValues({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      handleError(error);
    } finally {
      setIsCurrentlySubmitting(null);
    }
  };

  return (
    <Box>
      {/* <Helmet>
          <title>HMO Profile</title>
          <meta name="HMO Profile" content=" " />
          <link rel="canonical" href="/" />
        </Helmet> */}

      {/* Main Layout */}
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#FAFAFA",
          height: "100vh",
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
                color: "#101828",
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
                  mb: 4,
                }}
              >
                <Box>
                  <img
                    src={profileValues.image || ProfileImage}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      marginBottom: "16px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: 500,
                      lineHeight: "28px",
                      color: "#071C42",
                    }}
                  >
                    {fullname}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      color: "#304262",
                    }}
                  >
                    {userRole}
                  </Typography>
                </Box>
                {/* <Box sx={{ mb: 2 }}>
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
                        color: "#F2F2F2",
                      }}
                      onClick={() => setToggleEditProfile(!toggleEditProfile)}
                    >
                      Edit Profile
                    </Button>
                  </Box> */}
              </Box>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateProfile();
                }}
              >
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
                        lineHeight: "24px",
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
                      name="firstname"
                      value={profileValues.firstname}
                      onChange={(e) =>
                        setProfileValues({
                          ...profileValues,
                          firstname: e.target.value,
                        })
                      }
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
                        lineHeight: "24px",
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
                      name="lastname"
                      value={profileValues.lastname}
                      onChange={(e) =>
                        setProfileValues({
                          ...profileValues,
                          lastname: e.target.value,
                        })
                      }
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                  mt={2}
                >
                  {/* <Box
                      flex={1}
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography
                        sx={{
                          color: "#595959",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                        }}
                      >
                        Middle Name
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        // required
                        placeholder="enter middle name"
                        sx={textFieldStyles}
                        name="middlename"
                        value={profileValues.middlename}
                        onChange={(e) =>
                          setProfileValues({
                            ...profileValues,
                            middlename: e.target.value,
                          })
                        }
                      />
                    </Box> */}
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px",
                      }}
                    >
                      Phone Number
                    </Typography>
                    <FormControl fullWidth>
                      <PhoneInput
                        country={"ng"}
                        inputStyle={formControlStyles}
                        inputProps={{
                          name: "phone",
                          required: true,
                          placeholder: "Enter phone number",
                        }}
                        value={profileValues.phone}
                        onChange={(phone) =>
                          setProfileValues({
                            ...profileValues,
                            phone: phone,
                          })
                        }
                      />
                    </FormControl>
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
                        lineHeight: "24px",
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
                      name="email"
                      value={profileValues.email}
                      onChange={(e) =>
                        setProfileValues({
                          ...profileValues,
                          email: e.target.value,
                        })
                      }
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                  mt={2}
                >
                  {/* <Box
                      flex={1}
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography
                        sx={{
                          color: "#595959",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                        }}
                      >
                        Designation
                      </Typography>
                      <TextField
                        fullWidth
                        variant="outlined"
                        // required
                        placeholder="e.g H23 dolphin estate"
                        sx={textFieldStyles}
                      />
                    </Box> */}
                </Box>
                <Box sx={{ mb: 2 }} display={"flex"} justifyContent={"center"}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "144px",
                      height: "42px",
                      borderRadius: "12px",
                      backgroundColor: "#038F3E",
                      color: "#FFFFFF",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      textTransform: "none",
                      marginTop: "36px",
                    }}
                    loading={isCurrentlySubmitting === "profile"}
                  >
                    Update Profile
                  </Button>
                </Box>
              </form>
            </Box>

            {/* Form Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
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
                  mt: 5,
                }}
              >
                Security
              </Typography>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChangePassword();
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Current Password */}
                  <Box
                    flex={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      width: "49%",
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
                      Enter your current password
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <Box sx={{ position: "relative" }}>
                      <TextField
                        type={passwordVisible ? "text" : "password"}
                        variant="outlined"
                        required
                        placeholder="enter your password"
                        sx={textFieldStyles}
                        name="current_password"
                        value={passwordValues.current_password}
                        onChange={(e) =>
                          setPassowrdValues({
                            ...passwordValues,
                            current_password: e.target.value,
                          })
                        }
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        {passwordVisible ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </span>
                    </Box>
                  </Box>

                  {/* New Password and Confirm Password */}
                  <Box
                    sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}
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
                          lineHeight: "24px",
                        }}
                      >
                        New Password
                        <span style={{ color: "#099243", marginLeft: "6px" }}>
                          *
                        </span>
                      </Typography>
                      <Box sx={{ position: "relative" }}>
                        <TextField
                          fullWidth
                          type={confirmPasswordVisible ? "text" : "password"}
                          variant="outlined"
                          required
                          placeholder="Enter new password"
                          sx={textFieldStyles}
                          name="new_password"
                          value={passwordValues.new_password}
                          onChange={(e) =>
                            setPassowrdValues({
                              ...passwordValues,
                              new_password: e.target.value,
                            })
                          }
                        />
                        <span
                          onClick={toggleConfirmPasswordVisibility}
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          {confirmPasswordVisible ? (
                            <VisibilityOffOutlined />
                          ) : (
                            <VisibilityOutlined />
                          )}
                        </span>
                      </Box>
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
                          lineHeight: "24px",
                        }}
                      >
                        Confirm new password
                        <span style={{ color: "#099243", marginLeft: "6px" }}>
                          *
                        </span>
                      </Typography>
                      <Box sx={{ position: "relative" }}>
                        <TextField
                          fullWidth
                          type={confirmPasswordVisible ? "text" : "password"}
                          variant="outlined"
                          required
                          placeholder="Confirm new password"
                          sx={textFieldStyles}
                          name="confirm_password"
                          value={passwordValues.confirm_password}
                          onChange={(e) =>
                            setPassowrdValues({
                              ...passwordValues,
                              confirm_password: e.target.value,
                            })
                          }
                        />
                        <span
                          onClick={toggleConfirmPasswordVisibility}
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          {confirmPasswordVisible ? (
                            <VisibilityOffOutlined />
                          ) : (
                            <VisibilityOutlined />
                          )}
                        </span>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{ mb: 2 }}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        // width: "144px",
                        height: "42px",
                        borderRadius: "12px",
                        backgroundColor: "#038F3E",
                        color: "#FFFFFF",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px",
                        textTransform: "none",
                        marginTop: "36px",
                      }}
                      loading={isCurrentlySubmitting === "password"}
                    >
                      Update Password
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Permission Section */}
              {/* <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
                  <Typography
                    sx={{
                      fontSize: "24px",
                      fontWeight: 500,
                      lineHeight: "32.4px",
                      textTransform: "none",
                      color: "#038F3E",
                      mt: 5,
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
                        mb: 1,
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
                        mb: 2,
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
                          color: "#595959",
                        }}
                      >
                        <Checkbox
                          defaultChecked={permission.checked}
                          sx={{
                            "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                              color: "#000000",
                            },
                            color: "#000000",
                          }}
                        />
                        {permission.label}
                      </Typography>
                    ))}
                  </Box>
                </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProvidersProfile;
