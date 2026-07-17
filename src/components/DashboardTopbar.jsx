import PropTypes from "prop-types";
import { Box, Typography, IconButton, Badge } from "@mui/material";
import { FiBell, FiMenu } from "react-icons/fi";
import Logo from "../assets/nhia-logo.png";
import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationCount } from "../services/general";
import { useNavigate } from "react-router-dom";

const DashboardTopbar = ({
  username,
  // role
  onMobileMenuClick,
}) => {
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const { data: notificationsCount } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getUnreadNotificationCount(),
  });

  const unreadCount = notificationsCount?.unread_count || 0;
  // const rolePath = userRole?.toLowerCase().replace("admin", "");

  const fullname = username || localStorage.getItem("fullname");
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        padding: "1rem",
        width: "100%",
        height: "88px",
        px: 2,
        // borderRadius: "0px 0px 8px 8px",
        boxShadow: "0px 1px 0px 0px #12203B17",
        // borderBottom: "1px solid #E0E0E0",
      }}
    >
      {/* Mobile Logo */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
        }}
      >
        <img src={Logo} alt="NHIA Logo" style={{ height: "40px" }} />
      </Box>

      {/* Welcome Message */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Typography variant="h6" fontWeight="bold">
          Welcome, {fullname}
          {/* {role} */}
        </Typography>
      </Box>

      {/* <Box
        sx={{
          maxWidth: "403px",
          width: "40%",
          display: { xs: "none", md: "block" },
        }}
      >
        <TextField
          placeholder="Type to search"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              color: "#A1A1AA",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              "& fieldset": {
                borderColor: "#E4E4E7",
              },
              "&:hover fieldset": {
                borderColor: "#cccccc",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#E4E4E7",
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box> */}

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 2, ml: { xs: 1, md: 0 } }}>
        {/* <IconButton>
          <FiSearch size={20} color="#000000" />
        </IconButton> */}
        <Badge
          badgeContent={unreadCount}
          color="error"
          sx={{ mr: 1, fontSize: "10px" }}
          overlap="circular"
        >
          <IconButton
            sx={{ backgroundColor: "#F8F8F8", border: "0.64px solid #DADADA" }}
            onClick={() => navigate(`${userRole.toLowerCase()}/notifications`)}
          >
            <FiBell size={20} color="#000000" />
          </IconButton>
        </Badge>

        {/* Mobile Menu Toggle */}
        <IconButton
          onClick={onMobileMenuClick}
          sx={{ display: { xs: "inline-flex", md: "none" }, mr: 1 }}
        >
          <FiMenu />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DashboardTopbar;

DashboardTopbar.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
  onMobileMenuClick: PropTypes.func,
};
