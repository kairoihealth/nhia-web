import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
// import { Helmet } from "react-helmet-async";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import { hmoAdmin, hmoAdminLevel, hmoAdminLevelPermissions } from "../../../mock/hmoAdmins";

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

const selectStyles = {
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "#F5F5F5",
  color: "#737373",
  border: "0.5px solid #DADADA",
  fontSize: "16px",
  outline: "none",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#038F3E" // Green border color
  }
};

const StateSettings = () => {
  const [activeTab, setActiveTab] = useState("add");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box>
      {/* <Helmet>
        <title>State Settings</title>
        <meta name="State Settings" content=" " />
        <link rel="canonical" href="/settings" />
      </Helmet> */}

      {/* Main Content Area */}
      <Box
        sx={{ display: "flex", justifyContent: "space-around", mt: 6, px: 3 }}
      >
        <Box sx={{ width: "40%" }}>
          {/* Title */}
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#101828",
              mb: 4
            }}
            gutterBottom
          >
            Settings
          </Typography>

          {/* Tab Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              gap: 2,
              mb: 4
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
                  backgroundColor: activeTab === "add" ? "#20201E" : "#F5F5F5"
                },
                border: "1px solid #000000"
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
                  fontSize: "16px"
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
                  backgroundColor: activeTab === "edit" ? "#20201E" : "#F5F5F5"
                },
                border: "1px solid #000000"
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
                  fontSize: "16px"
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
                    activeTab === "manage" ? "#000000" : "#F5F5F5"
                },
                border: "1px solid #000000"
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
                  fontSize: "16px"
                }}
              />
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: "60%" }}>
          <Box sx={{ width: "70%" }}>
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
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "28px",
          color: "#000000"
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
          gap: 3
        }}
      >
        {/* First Name */}
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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

        {/* Middle Name */}
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
            placeholder="enter first name"
            sx={textFieldStyles}
          />
        </Box>

        {/* Last Name */}
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
            placeholder="enter first name"
            sx={textFieldStyles}
          />
        </Box>

        {/* Email Address */}
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
            type="email"
            variant="outlined"
            required
            placeholder="enter first name"
            sx={textFieldStyles}
          />
        </Box>

        {/* Designation */}
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
            placeholder="enter first name"
            sx={textFieldStyles}
          />
        </Box>

        {/* Create Password */}
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              color: "#595959",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            Create Password
            <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            // label="Create Password"
            type={passwordVisible ? "text" : "password"}
            placeholder="*********"
            required
            slotProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordVisible ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={textFieldStyles}
          />
        </Box>

        {/* Admin Status */}
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              color: "#595959",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            Admin status
          </Typography>
          <FormControl fullWidth variant="outlined">
            <Select sx={selectStyles}>
              <MenuItem
                value=""
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#737373"
                }}
              >
                Select option
              </MenuItem>
              <MenuItem value="hmo">Admin I</MenuItem>
              <MenuItem value="provider">Admin II</MenuItem>
              <MenuItem value="nhia">Admin III</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
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
                backgroundColor: "#027A3B"
              }
            }}
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
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "28px",
          color: "#000000"
        }}
        gutterBottom
      >
        Edit admin information
      </Typography>
      <Box sx={{ display: "flex", gap: 4, mt: 3 }}>
        {hmoAdmin.map((t) => (
          <Box
            key={t.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              border:
                selectedAdmin?.id === t.id
                  ? "2px solid #038F3E"
                  : "transparent",
              padding: 2,
              borderRadius: "8px",
              cursor: "pointer",
              "&:hover": {
                border: "2px solid #038F3E"
              }
            }}
            onClick={() => setSelectedAdmin(t)}
          >
            <img
              src={t.icon}
              alt=""
              style={{ width: "67px", height: "67px" }}
            />
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#000000"
              }}
            >
              {t.firstname} {t.lastname}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#304262"
              }}
            >
              {t.role}
            </Typography>
          </Box>
        ))}
      </Box>
      {selectedAdmin && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            mt: 6,
            mb: 3
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              color: "#000000"
            }}
          >
            {selectedAdmin.firstname} {selectedAdmin.lastname}
          </Typography>
          <img
            src={selectedAdmin.icon}
            alt=""
            style={{ width: "67px", height: "67px" }}
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px",
              color: "#304262"
            }}
          >
            {selectedAdmin.role}
          </Typography>
        </Box>
      )}

      {/*Form */}
      {selectedAdmin && (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}
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
              value={selectedAdmin.firstname}
            />
          </Box>

          {/* Middle Name */}
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
              placeholder="enter first name"
              sx={textFieldStyles}
              value={selectedAdmin.middlename}
            />
          </Box>

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
                lineHeight: "24px"
              }}
            >
              Last Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              required
              placeholder="enter first name"
              sx={textFieldStyles}
              value={selectedAdmin.lastname}
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
                lineHeight: "24px"
              }}
            >
              Email Address
            </Typography>
            <TextField
              fullWidth
              type="email"
              variant="outlined"
              required
              placeholder="enter first name"
              sx={textFieldStyles}
              value={selectedAdmin.email}
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
                lineHeight: "24px"
              }}
            >
              Designation
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              required
              placeholder="enter first name"
              sx={textFieldStyles}
              value={selectedAdmin.designation}
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
                lineHeight: "24px"
              }}
            >
              Admin Status
            </Typography>
            <FormControl fullWidth variant="outlined">
              <Select sx={selectStyles}>
                <MenuItem
                  value={selectedAdmin.role}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#737373"
                  }}
                >
                  Select option
                </MenuItem>
                <MenuItem value="hmo">HMO</MenuItem>
                <MenuItem value="provider">Providers</MenuItem>
                <MenuItem value="nhia">NHIA</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
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
                  backgroundColor: "#027A3B"
                }
              }}
            >
              Update Admin
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

// Manage Admin Roles Component
const ManageAdminRoles = () => {
  const [newLevel, setNewLevel] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [newLevelPermissions, setNewLevelPermissions] = useState([]);
  // const [adminRoleName, setAdminRoleName] = useState("");

  const handleLevelClick = (level) => {
    setSelectedLevel(level); // Set the selected admin level
    setNewLevel(false); // Exit "add new level" mode
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

  return (
    <Box sx={{ mt: 4 }}>
      {!newLevel && !selectedLevel ? (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#000000"
              }}
              gutterBottom
            >
              Manage admin roles
            </Typography>
            <Box
              sx={{ display: "flex", gap: 1, cursor: "pointer" }}
              onClick={() => setNewLevel(true)}
            >
              <AddCircleOutlineIcon sx={{ color: "#071C42" }} />
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "28px",
                  color: "#000000"
                }}
              >
                Add admin level
              </Typography>
            </Box>
          </Box>

          {/* List of Admin Levels */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {hmoAdminLevel.map((t) => (
              <Box
                key={t.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "495px",
                  height: "52px",
                  border: "0.5px solid #DADADA",
                  backgroundColor: "#F5F5F5",
                  p: 1.5,
                  cursor: "pointer"
                }}
                onClick={() => handleLevelClick(t)}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "28px",
                    color: "#000000"
                  }}
                >
                  {t.title}
                </Typography>
                <ArrowForwardIosIcon sx={{ color: "#292D32" }} />
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            onClick={() =>
              selectedLevel ? setSelectedLevel(null) : setNewLevel(false)
            }
          >
            <Box sx={{ display: "flex", gap: 1, cursor: "pointer" }}>
              <ArrowBackIosNewIcon sx={{ color: "#292D32" }} />
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "28px"
                }}
              >
                {selectedLevel ? "Back" : "Admin level name"}
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
                  color: "#EB001B"
                }}
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
                  lineHeight: "24px"
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
              />
            </Box>
          )}

          <Box sx={{ mt: 3 }}>
            {newLevel && (
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: "#000000"
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
                    alignItems: "flex-start"
                  }}
                  control={
                    <Checkbox
                      checked={
                        newLevel
                          ? newLevelPermissions.includes(permission.id) // Check permissions based on new level's state
                          : selectedLevel?.permissions.includes(permission.id)
                      }
                      onChange={(e) =>
                        handlePermissionChange(permission.id, e.target.checked)
                      }
                      sx={{
                        color: "#000000",
                        "&.Mui-checked": { color: "#000000" }
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
                        mt: 0.8
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
                    backgroundColor: "#027A3B"
                  }
                }}
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
