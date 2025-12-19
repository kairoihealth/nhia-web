/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

// import { Helmet } from "react-helmet-async";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { hmoAdminLevelPermissions } from "../../../mock/hmoAdmins";
import ReactSelect from "react-select";
import { selectStyles } from "../../../utils/style";
import {
  useHandleError,
  useHandleSuccess,
} from "../../../hooks/useToastHandler";
import {
  addAdminStatus,
  addNewAdmin,
  deleteAdminStatus,
  getAdminStatuses,
  updateAdmin,
  updateAdminStatus,
} from "../../../services/adminSettings";
import { useQuery } from "@tanstack/react-query";
import { FaCircleUser } from "react-icons/fa6";
import { useMemo } from "react";
import { useEffect } from "react";
import { getUsers } from "../../../services/central";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#000000",
    border: "0",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "0",
    },
  },
  "& .MuiOutlinedInput-input": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#000000",
    border: "0.5px solid #DADADA",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E",
    },
  },
};

// const selectStyles = {
//   width: "100%",
//   borderRadius: "8px",
//   backgroundColor: "#F5F5F5",
//   color: "#000000",
//   border: "0.5px solid #DADADA",
//   fontSize: "16px",
//   outline: "none",
//   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#038F3E", // Green border color
//   },
// };

const getUserRole = () => localStorage.getItem("userRole");

const StateSettings = () => {
  const [activeTab, setActiveTab] = useState("add");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box
      sx={{
        px: 3,
      }}
    >
      {/* <Helmet>
         <title>Central Settings</title>
         <meta name="Central Settings" content=" " />
         <link rel="canonical" href="/settings" />
       </Helmet> */}

      {/* Title */}
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "28px",
          color: "#101828",
          mb: 3,
        }}
        gutterBottom
      >
        Settings
      </Typography>

      {/* Main Content Area */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "2rem",
        }}
      >
        <Box sx={{ width: "40%" }}>
          {/* Tab Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // width: "80%",
              padding: "20px",
              gap: 2,
              mb: 4,
              background: "#FAFAFA",
            }}
          >
            <Button
              variant={activeTab === "add" ? "contained" : "outlined"}
              onClick={() => handleTabClick("add")}
              sx={{
                width: "395px",
                height: "55px",
                display: "flex",
                justifyContent: "space-between",
                textTransform: "none",
                backgroundColor:
                  activeTab === "add" ? "#20201E" : "transparent",
                color: activeTab === "add" ? "#FFFFFF" : "#000000",
                "&:hover": {
                  backgroundColor: activeTab === "add" ? "#20201E" : "#F5F5F5",
                },
                border: `1px solid ${
                  activeTab === "add" ? "#20201E" : "#DADADA"
                }`,
              }}
            >
              <Typography
                sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "28px" }}
              >
                Add new admin
              </Typography>
              <ArrowForwardIosIcon
                sx={{
                  color: activeTab === "add" ? "#FFFFFF" : "#000000",
                  fontSize: "16px",
                }}
              />
            </Button>
            <Button
              variant={activeTab === "edit" ? "contained" : "outlined"}
              onClick={() => handleTabClick("edit")}
              sx={{
                width: "395px",
                height: "55px",
                display: "flex",
                justifyContent: "space-between",
                textTransform: "none",
                backgroundColor:
                  activeTab === "edit" ? "#20201E" : "transparent",
                color: activeTab === "edit" ? "#FFFFFF" : "#000000",
                "&:hover": {
                  backgroundColor: activeTab === "edit" ? "#20201E" : "#F5F5F5",
                },
                border: `1px solid ${
                  activeTab === "edit" ? "#20201E" : "#DADADA"
                }`,
              }}
            >
              <Typography
                sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "28px" }}
              >
                Edit admin information
              </Typography>
              <ArrowForwardIosIcon
                sx={{
                  color: activeTab === "edit" ? "#FFFFFF" : "#000000",
                  fontSize: "16px",
                }}
              />
            </Button>
            <Button
              variant={activeTab === "manage" ? "contained" : "outlined"}
              onClick={() => handleTabClick("manage")}
              sx={{
                width: "395px",
                height: "55px",
                display: "flex",
                justifyContent: "space-between",
                textTransform: "none",
                backgroundColor:
                  activeTab === "manage" ? "#20201E" : "transparent",
                color: activeTab === "manage" ? "#FFFFFF" : "#000000",
                "&:hover": {
                  backgroundColor:
                    activeTab === "manage" ? "#000000" : "#F5F5F5",
                },
                border: `1px solid ${
                  activeTab === "manage" ? "#20201E" : "#DADADA"
                }`,
              }}
            >
              <Typography
                sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "28px" }}
              >
                Manage admin roles
              </Typography>
              <ArrowForwardIosIcon
                sx={{
                  color: activeTab === "manage" ? "#FFFFFF" : "#000000",
                  fontSize: "16px",
                }}
              />
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ width: "90%" }}>
            {/* Dynamic Content Based on Active Tab */}
            {activeTab === "add" && <AddAdminForm />}
            {activeTab === "edit" && <EditAdminForm />}
            {activeTab === "manage" && <ManageAdminRoles />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Add Admin Form Component
const AddAdminForm = () => {
  const stateId = localStorage.getItem("stateId");
  const userRole = getUserRole();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const [formData, setFormData] = useState({
    email: "",
    designation: "",
    admin_status: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: statuses,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => getAdminStatuses({ page: 1, pageSize: 10 }),
  });

  const activeStatuses = statuses?.results?.filter(
    (status) => status?.is_active
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        email: formData.email,
        designation: formData.designation,
        admin_status: formData.admin_status.value,
        role: userRole,
        state: stateId,
      };
      console.log(payload, "submitted");
      await addNewAdmin(payload);
      handleSuccess("Admin added successfully!");
      setFormData({
        email: "",
        designation: "",
        admin_status: "",
      });
    } catch (error) {
      handleError("Registration failed. Please try again.", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ background: "#FAFAFA", padding: "20px" }}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "28px",
          color: "#000000",
          mb: "24px",
        }}
        gutterBottom
      >
        Add new admin
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        onSubmit={handleSubmit}
      >
        {/* Middle Name */}
        {/* <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
              required
              placeholder="enter first name"
              sx={textFieldStyles}
            />
          </Box> */}

        {/* Email Address */}
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
            type="email"
            variant="outlined"
            required
            placeholder="enter email address"
            sx={textFieldStyles}
            name="email"
            onChange={handleChange}
            value={formData.email}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Box>

        {/* Designation */}
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
            required
            placeholder="enter designation"
            sx={textFieldStyles}
            name="designation"
            onChange={handleChange}
            value={formData.designation}
            error={!!errors.designation}
            helperText={errors.designation}
          />
        </Box>

        {/* Admin Status */}
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              color: "#595959",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Admin status
          </Typography>
          <FormControl fullWidth variant="outlined">
            <ReactSelect
              styles={selectStyles}
              // value={selectedType}
              // onChange={handleTypeChange}
              onChange={(e) => setFormData({ ...formData, admin_status: e })}
              value={formData.admin_status}
              name="admin_status"
              options={activeStatuses?.map((status) => ({
                value: status.id,
                label: status.name,
              }))}
              placeholder="Select Admin Status"
            />
          </FormControl>
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "380px",
              height: "48px",
              backgroundColor: "#038F3E",
              color: "#FFFFFF",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#027A3B",
              },
            }}
            disabled={
              !formData.admin_status.value ||
              !formData.email ||
              !formData.designation
            }
            loading={isSubmitting}
          >
            Add Admin
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// Edit Admin Form Component
const EditAdminForm = () => {
  const stateId = localStorage.getItem("stateId");
  const userId = localStorage.getItem("userId");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const userRole = getUserRole();
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const [formData, setFormData] = useState({
    // firstName: "",
    // lastName: "",
    email: "",
    designation: "",
    admin_status: "",
    // password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const {
  //   data: admins,
  //   isLoading: isLoadingAdmins,
  //   isError: isAdminError,
  //   error: adminError,
  // } = useQuery({
  //   queryKey: ["admins", isSubmitting],
  //   queryFn: () => getAdmins({ page: 1, pageSize: 10 }),
  // });

  const {
    data: admins,
    isLoading: isLoadingAdmins,
    isError: isAdminError,
    error: adminError,
  } = useQuery({
    queryKey: ["users", isSubmitting],
    queryFn: () =>
      getUsers({
        page: 1,
        pageSize: 100,
        role: "StateAdmin",
        state: stateId,
      }),
  });

  const { data: statuses, isLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => getAdminStatuses({ page: 1, pageSize: 10 }),
  });

  const activeStatuses = statuses?.results?.filter(
    (status) => status?.is_active
  );

  const stateAdmins = useMemo(() => admins?.results, [admins?.results]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormData({
      firstName: selectedAdmin?.firstname || "",
      lastName: selectedAdmin?.lastname || "",
      email: selectedAdmin?.email || "",
      designation: selectedAdmin?.designation || "",
      admin_status:
        activeStatuses
          ?.filter((status) => status.id === selectedAdmin?.admin_status?.id)
          ?.map((status) => ({ value: status.id, label: status.name }))[0] ||
        "",
    });
  }, [
    selectedAdmin?.admin_status,
    selectedAdmin?.designation,
    selectedAdmin?.email,
    selectedAdmin?.firstname,
    selectedAdmin?.lastname,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // const { isValid, errors: validationErrors } =
      //   validateAccountForm(formData);

      // if (!isValid) {
      //   setErrors(validationErrors);
      //   return;
      // }
      // console.log(isValid, validationErrors, "isValid");

      // const token = new URLSearchParams(location.search).get("token") || "";

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        designation: formData.designation,
        admin_status: formData.admin_status.value,
        role: userRole,
        // password: formData.password,
      };
      console.log(payload, "submitted");
      await updateAdmin(selectedAdmin?.id, payload);
      handleSuccess("Admin updated successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        designation: "",
        admin_status: "",
        // password: "",
      });
      setSelectedAdmin(null);
      // navigate("/login");
    } catch (error) {
      handleError("Update failed. Please try again.", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Box sx={{ background: "#FAFAFA", padding: "20px", mb: 4 }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "28px",
            color: "#000000",
          }}
          gutterBottom
        >
          Edit admin information
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            flexWrap: "wrap",
            gap: 4,
            mt: 3,
          }}
        >
          {isLoadingAdmins ? (
            <Typography>Loading admins...</Typography>
          ) : isAdminError ? (
            <Typography color="red">
              Error: {adminError.message || "Failed to load admins"}
            </Typography>
          ) : !stateAdmins?.length ? (
            <Typography>No admins available</Typography>
          ) : null}
          {stateAdmins?.map((t) => (
            <Box
              key={t.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                outline:
                  selectedAdmin?.id === t.id
                    ? "1px solid #071C42"
                    : "transparent",
                padding: 2,
                borderRadius: "8px",
                textAlign: "center",
                background: "#ffffff",
                cursor: "pointer",
                "&:hover": {
                  outline: "1px solid #071C42",
                },
              }}
              onClick={() => setSelectedAdmin(t)}
            >
              {t.image ? (
                <img
                  src={t.image}
                  alt=""
                  style={{ width: "67px", height: "67px" }}
                />
              ) : (
                <FaCircleUser style={{ width: "67px", height: "67px" }} />
              )}
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#000000",
                }}
              >
                {t.firstname} {t.lastname} {t.id === userId && "(You)"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: "#304262",
                }}
              >
                {t.admin_status?.name || "No role assigned"}
              </Typography>
              {!t.verified && (
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    lineHeight: "24px",
                    color: "#FF8C00",
                    background: "#FFF4E5",
                    px: 1,
                    borderRadius: "4px",
                  }}
                >
                  Pending
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
      {selectedAdmin && (
        <Box
          sx={{
            background: "#FAFAFA",
            padding: "20px",
          }}
        >
          <Box
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
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#000000",
                mb: 3,
              }}
            >
              {selectedAdmin.firstname} {selectedAdmin.lastname}
            </Typography>
            {selectedAdmin.image ? (
              <img
                src={selectedAdmin.image}
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              <FaCircleUser style={{ width: "50px", height: "50px" }} />
            )}
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#304262",
              }}
            >
              {selectedAdmin.admin_status?.name || "No role assigned"}
            </Typography>
          </Box>
          {/*Form */}

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            onSubmit={handleSubmit}
          >
            {/* First Name */}
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
                focused={true}
                sx={textFieldStyles}
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Box>

            {/* Middle Name */}
            {/* <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
             required
             placeholder="enter first name"
             sx={textFieldStyles}
           />
         </Box> */}

            {/* Last Name */}
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
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>

            {/* Email Address */}
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
                type="email"
                variant="outlined"
                required
                placeholder="enter email address"
                sx={textFieldStyles}
                name="email"
                onChange={handleChange}
                value={formData.email}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>

            {/* Designation */}
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
                Designation
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                required
                placeholder="enter designation"
                sx={textFieldStyles}
                name="designation"
                onChange={handleChange}
                value={formData.designation}
                error={!!errors.designation}
                helperText={errors.designation}
              />
            </Box>

            {/* Admin Status */}
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
                Admin status
              </Typography>
              <FormControl fullWidth variant="outlined">
                <ReactSelect
                  styles={selectStyles}
                  onChange={(e) =>
                    setFormData({ ...formData, admin_status: e })
                  }
                  value={formData.admin_status}
                  name="admin_status"
                  options={activeStatuses?.map((status) => ({
                    value: status.id,
                    label: status.name,
                  }))}
                  placeholder="Select Admin Status"
                  loading={isLoading}
                />
              </FormControl>
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "380px",
                  height: "48px",
                  backgroundColor: "#038F3E",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  py: 1.5,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#027A3B",
                  },
                }}
                disabled={
                  !selectedAdmin ||
                  !formData.admin_status ||
                  !formData.email ||
                  !formData.designation ||
                  !formData.firstName ||
                  !formData.lastName
                }
                loading={isSubmitting}
              >
                Update Admin
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

// Manage Admin Roles Component
const ManageAdminRoles = () => {
  const handleError = useHandleError();
  const handleSuccess = useHandleSuccess();
  const [newLevel, setNewLevel] = useState(false);
  const [levelName, setLevelName] = useState("");
  const [levelRank, setLevelRank] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [newLevelPermissions, setNewLevelPermissions] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // const [adminRoleName, setAdminRoleName] = useState("");

  const { data: statuses, isLoading } = useQuery({
    queryKey: ["statuses", isSubmitting],
    queryFn: () => getAdminStatuses({ page: 1, pageSize: 10 }),
  });

  const activeStatuses = statuses?.results?.filter(
    (status) => status?.is_active
  );

  const handleLevelClick = (level) => {
    setSelectedLevel(level); // Set the selected admin level
    setNewLevel(false); // Exit "add new level" mode
    setLevelName(level.name); // Pre-fill the level name
    setLevelRank(level.level); // Pre-fill the level rank
  };

  const handlePermissionChange = (permissionId, checked) => {
    if (newLevel) {
      // If adding a new level, update its permissions
      let updatedPermissions = [...newLevelPermissions];
      if (checked) {
        updatedPermissions = [...updatedPermissions, permissionId]; // Add permission
      } else {
        updatedPermissions = updatedPermissions.filter(
          (id) => id !== permissionId
        ); // Remove permission
      }
      setNewLevelPermissions(updatedPermissions);
    } else if (selectedLevel) {
      // If editing an existing level, update its permissions
      let updatedPermissions = [...selectedLevel.permissions];
      if (checked) {
        updatedPermissions = [...updatedPermissions, permissionId];
      } else {
        updatedPermissions = updatedPermissions.filter(
          (id) => id !== permissionId
        );
      }
      setSelectedLevel({ ...selectedLevel, permissions: updatedPermissions });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: levelName,
        permissions: newLevel
          ? newLevelPermissions
          : selectedLevel?.permissions,
        level: levelRank,
      };

      await (newLevel
        ? addAdminStatus(payload)
        : updateAdminStatus(selectedLevel?.id, payload));
      handleSuccess("Admin level updated successfully!");
      setLevelName("");
      setLevelRank("");
      setNewLevel(false);
      setSelectedLevel(null);
    } catch (error) {
      handleError("Update failed. Please try again.", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAdmin = async () => {
    setIsSubmitting(true);
    try {
      await deleteAdminStatus(selectedLevel?.id);
      handleSuccess("Admin level deleted successfully!");
      setLevelName("");
      setLevelRank("");
      setNewLevel(false);
      setSelectedLevel(null);
    } catch (error) {
      handleError("Failed to delete. Please try again.", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ background: "#FAFAFA", padding: "20px" }}>
      {!newLevel && !selectedLevel ? (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#000000",
                mb: 0,
              }}
            >
              Manage admin roles
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                cursor: "pointer",
              }}
              onClick={() => setNewLevel(true)}
            >
              <AddCircleOutlineIcon sx={{ color: "#071C42" }} />
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "28px",
                  color: "#000000",
                }}
              >
                Add admin level
              </Typography>
            </Box>
          </Box>

          {/* List of Admin Levels */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {activeStatuses?.length ? (
              activeStatuses?.map((t) => (
                <Box
                  key={t.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: "560px",
                    height: "52px",
                    border: "0.5px solid #DADADA",
                    backgroundColor: "#F5F5F5",
                    p: 1.5,
                    cursor: "pointer",
                  }}
                  onClick={() => handleLevelClick(t)}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "28px",
                      color: "#000000",
                    }}
                  >
                    {t.name}
                  </Typography>
                  <ArrowForwardIosIcon
                    sx={{ color: "#292D32", fontSize: "16px" }}
                  />
                </Box>
              ))
            ) : (
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 400,
                  lineHeight: "28px",
                  color: "#555555",
                }}
              >
                No admin roles found.
              </Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            onClick={() =>
              selectedLevel ? setSelectedLevel(null) : setNewLevel(false)
            }
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
            >
              <ArrowBackIosNewIcon
                sx={{ color: "#292D32", fontSize: "16px" }}
              />
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "28px",
                }}
              >
                {selectedLevel ? selectedLevel?.name : "Back"}
              </Typography>
            </Box>
            {!newLevel && (
              <Box sx={{ display: "flex", gap: 0.5, cursor: "pointer" }}>
                <DeleteOutlineTwoToneIcon sx={{ color: "#EB001B" }} />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "28px",
                    color: "#EB001B",
                  }}
                  role="button"
                  onClick={handleDeleteAdmin}
                >
                  Delete Admin level
                </Typography>
              </Box>
            )}
          </Box>

          {/* add level */}
          {newLevel && (
            <Box
              flex={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Admin level name
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                required
                placeholder="enter level name"
                sx={textFieldStyles}
                name="levelName"
                onChange={(e) => setLevelName(e.target.value)}
                value={levelName}
                error={!levelName}
                helperText={!levelName ? "Level name is required" : ""}
              />
            </Box>
          )}

          <Box
            flex={1}
            sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}
          >
            <Typography
              sx={{
                color: "#595959",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              Admin level
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              min="1"
              required
              placeholder="enter level"
              sx={textFieldStyles}
              name="levelRank"
              onChange={(e) => setLevelRank(e.target.value)}
              value={levelRank}
              error={!levelRank}
              helperText={!levelRank ? "Level rank is required" : ""}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            {newLevel && (
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: "#000000",
                }}
              >
                Select Permissions
              </Typography>
            )}
            {hmoAdminLevelPermissions.map((permission, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "flex-start", mt: 2 }}
              >
                <FormControlLabel
                  key={permission.id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                  control={
                    <Checkbox
                      checked={
                        newLevel
                          ? newLevelPermissions.includes(permission.id) // Check permissions based on new level's state
                          : selectedLevel?.permissions?.includes(permission.id)
                      }
                      onChange={(e) =>
                        handlePermissionChange(permission.id, e.target.checked)
                      }
                      sx={{
                        color: "#000000",
                        "&.Mui-checked": { color: "#000000" },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "28px",
                        color: "#595959",
                        mt: 0.8,
                      }}
                    >
                      {permission.title}:{" "}
                      <span style={{ fontWeight: 400 }}>
                        {permission.description}
                      </span>
                    </Typography>
                  }
                />
              </Box>
            ))}

            {/*Button*/}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "380px",
                  height: "48px",
                  backgroundColor: "#038F3E",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  py: 1.5,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#027A3B",
                  },
                }}
                loading={isSubmitting}
                disabled={
                  newLevel
                    ? !levelName || newLevelPermissions?.length === 0
                    : !levelName || selectedLevel?.permissions?.length === 0
                }
              >
                {newLevel ? "Add Level" : "Save changes"}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StateSettings;
