import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import {
  FiLogOut,
  FiUser,
  // FiSettings,
  FiHome,
  FiSettings,
  FiX,
} from "react-icons/fi";
import Logo from "../assets/nhia-logo.png";
import { TbReportAnalytics } from "react-icons/tb";
import { LuCross } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuData = {
  HMO: [
    { id: 1, label: "Dashboard", icon: <FiHome />, link: "/hmo/dashboard" },
    {
      id: 2,
      label: "Complaints",
      icon: <FaRegComment />,
      link: "/hmo/complaints",
    },
    {
      id: 3,
      label: "Reports",
      icon: <TbReportAnalytics />,
      link: "/hmo/reports",
    },
    { id: 4, label: "Profile", icon: <FiUser />, link: "/hmo/profile" },
    { id: 5, label: "Settings", icon: <FiSettings />, link: "/hmo/settings" },
  ],
  Provider: [
    {
      id: 1,
      label: "Dashboard",
      icon: <FiHome />,
      link: "/provider/dashboard",
    },
    {
      id: 2,
      label: "Complaints",
      icon: <FaRegComment />,
      link: "/provider/complaints",
    },
    {
      id: 3,
      label: "Reports",
      icon: <TbReportAnalytics />,
      link: "/provider/reports",
    },
    { id: 4, label: "Profile", icon: <FiUser />, link: "/provider/profile" },
    {
      id: 5,
      label: "Settings",
      icon: <FiSettings />,
      link: "/provider/settings",
    },
  ],
  StateAdmin: [
    {
      id: 1,
      label: "Dashboard",
      icon: <FiHome />,
      link: "/stateadmin/dashboard",
    },
    {
      id: 2,
      label: "Complaints",
      icon: <FaRegComment />,
      link: "/stateadmin/complaints",
    },
    {
      id: 3,
      label: "Reports",
      icon: <TbReportAnalytics />,
      link: "/stateadmin/reports",
    },
    {
      id: 4,
      label: "Providers & HMO",
      icon: <LuCross />,
      link: "/stateadmin/invitations",
    },
    { id: 5, label: "Profile", icon: <FiUser />, link: "/stateadmin/profile" },
    {
      id: 6,
      label: "Settings",
      icon: <FiSettings />,
      link: "/stateadmin/settings",
    },
  ],
  Admin: [
    { id: 1, label: "Dashboard", icon: <FiHome />, link: "/admin/dashboard" },
    { id: 1, label: "Analysis", icon: <FiHome />, link: "/admin/analysis" },
    {
      id: 2,
      label: "Complaints",
      icon: <FaRegComment />,
      link: "/admin/complaints",
    },
    {
      id: 3,
      label: "Reports",
      icon: <TbReportAnalytics />,
      link: "/admin/reports",
    },
    {
      id: 4,
      label: "State Invites",
      icon: <LuCross />,
      link: "/admin/state/invite",
    },
    { id: 5, label: "Profile", icon: <FiUser />, link: "/admin/profile" },
    {
      id: 6,
      label: "Settings",
      icon: <FiSettings />,
      link: "/admin/settings",
    },
  ],
};

const DashboardSidebar = ({ showMobileMenu, onMobileClose }) => {
  const role = localStorage.getItem("userRole");
  // const menuItems = menuData[role] || [];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        p: 2,
      }}
    >
      <IconButton
        aria-label="close drawer"
        onClick={onMobileClose}
        sx={{
          display: { xs: "inline-flex", md: "none" },
          position: "absolute",
          top: 16,
          right: 16,
          color: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <FiX size={24} />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <img src={Logo} alt="NHIA Logo" style={{ width: "74.64px" }} />
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 3,
            cursor: "pointer",
            flexGrow: 1,
          }}
        >
          {menuData[role]?.length > 0 ? (
            menuData[role].map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "#038F3E" : "#FFFFFF",
                  backgroundColor: isActive ? "#FFFFFF" : "transparent",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                })}
              >
                {({ isActive }) => (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {item.icon}
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: isActive ? 600 : 500,
                        lineHeight: "21.6px",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                )}
              </NavLink>
            ))
          ) : (
            <Typography sx={{ color: "white", textAlign: "center", mt: 4 }}>
              Role not recognized
            </Typography>
          )}
        </Box>
      </Box>
      {/* Logout Button */}
      <Box
        sx={{
          borderTop: "1px solid #e0e0e0",
          cursor: "pointer",
          mx: -2, // Counteract parent padding
          background: "#038F3E",
          border: "none",
          padding: "12px 20px",
        }}
      >
        <ListItem
          component="button"
          onClick={logout}
          sx={{
            color: "#ffffff",
            background: "#038F3E",
            width: "100%",
            textAlign: "left",
            border: "none",
            gap: 2,
            
          }}
        >
          <ListItemIcon>
            <FiLogOut style={{ color: "#ffffff" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Drawer
        anchor="left"
        onClose={onMobileClose}
        open={showMobileMenu}
        variant="temporary"
        PaperProps={{
          sx: {
            width: 269,
            backgroundColor: "#038F3E",
            color: "#ffffff",
          },
        }}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {content}
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: 269,
          flexShrink: 0,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#038F3E",
          color: "#ffffff",
        }}
      >
        {content}
      </Box>
    </>
  );
};

export default DashboardSidebar;

DashboardSidebar.propTypes = {
  showMobileMenu: PropTypes.bool,
  onMobileClose: PropTypes.func,
};
