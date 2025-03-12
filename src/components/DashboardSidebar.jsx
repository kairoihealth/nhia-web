import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography
} from "@mui/material";
import {
  FiMenu,
  FiLogOut,
  FiX,
  FiUser,
  FiSettings,
  FiHome
} from "react-icons/fi";
import Logo from "../assets/nhia-logo.png";
import { TbReportAnalytics } from "react-icons/tb";
import { LuCross } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuData = {
  hmo: [
    { id: 1, label: "Dashboard", icon: <FiHome />, link: "/hmo-dashboard" },
    {
      id: 2,
      label: "Complaints",
      icon: <FaRegComment />,
      link: "/hmo-complaints"
    },
    {
      id: 3,
      label: "Reports",
      icon: <TbReportAnalytics />,
      link: "/hmo-reports"
    },
    { id: 4, label: "Profile", icon: <FiUser />, link: "/hmo-profile" },
    { id: 5, label: "Settings", icon: <FiSettings />, link: "/hmo-settings" }
  ],
  provider: [
    {
      id: 1,
      label: "Dashboard",
      icon: <FiHome />,
      link: "/providers-dashboard"
    },
    {
      id: 2,
      label: "Complaints",
      icon: <FaRegComment />,
      link: "/providers-complaints"
    },
    {
      id: 3,
      label: "Reports",
      icon: <TbReportAnalytics />,
      link: "/providers-reports"
    },
    { id: 4, label: "Profile", icon: <FiUser />, link: "/providers-profile" },
    {
      id: 5,
      label: "Settings",
      icon: <FiSettings />,
      link: "/providers-settings"
    }
  ],
  state: [
    { id: 1, label: "Dashboard", icon: <FiHome />, link: "/state-dashboard" },
    {
      id: 2,
      label: "Complaints",
      icon: <FaRegComment />,
      link: "/state-complaints"
    },
    {
      id: 3,
      label: "Reports",
      icon: <TbReportAnalytics />,
      link: "/state-reports"
    },
    {
      id: 4,
      label: "Providers & HMO",
      icon: <LuCross />,
      link: "/state-invitations"
    },
    { id: 5, label: "Profile", icon: <FiUser />, link: "/state-profile" },
    { id: 6, label: "Settings", icon: <FiSettings />, link: "/state-settings" }
  ],
  central: [
    { id: 1, label: "Dashboard", icon: <FiHome />, link: "/central-dashboard" },
    { id: 1, label: "Analysis", icon: <FiHome />, link: "/central-analysis" },
    {
      id: 2,
      label: "Complaints",
      icon: <FaRegComment />,
      link: "/central-complaints"
    },
    {
      id: 3,
      label: "Reports",
      icon: <TbReportAnalytics />,
      link: "/central-reports"
    },
    {
      id: 4,
      label: "State Invites",
      icon: <LuCross />,
      link: "/central-state-invite"
    },
    { id: 5, label: "Profile", icon: <FiUser />, link: "/central-profile" },
    {
      id: 6,
      label: "Settings",
      icon: <FiSettings />,
      link: "/central-settings"
    }
  ]
};

const DashboardSidebar = ({ role }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box
      sx={{
        width: showMobileMenu ? "94px" : "269px",
        transition: "width 0.3s ease",
        backgroundColor: "#038F3E",
        color: "#ffffff",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        p: 6
      }}
    >
      {/* Mobile Menu Toggle */}
      <Box
        sx={{
          p: 2,
          display: { xs: "flex", md: "none" },
          justifyContent: "center"
        }}
      >
        <IconButton onClick={handleMobileMenuToggle}>
          {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
        </IconButton>
      </Box>
      <Box>
        {/* Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src={Logo} alt="NHIA Logo" style={{ width: "74.64px" }} />
        </Box>

        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 3,
            cursor: "pointer"
          }}
        >
          {menuData[role]?.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              style={({ isActive }) => ({
                width: "223px",
                textDecoration: "none",
                color: isActive ? "#038F3E" : "#FFFFFF",
                backgroundColor: isActive ? "#FFFFFF" : "transparent",
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
                padding: "12px 20px",
                display: "flex",
                alignItems: "flex-end"
              })}
            >
              {({ isActive }) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {item.icon}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: isActive ? 600 : 500,
                      lineHeight: "21.6px"
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              )}
            </NavLink>
          ))}
        </Box>
      </Box>

      {/* Logout Button */}
      <Box
        sx={{
          // position: "absolute",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #e0e0e0",
          cursor: "pointer"
        }}
      >
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <FiLogOut style={{ color: "#ffffff" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Box>
  );
};

export default DashboardSidebar;

DashboardSidebar.propTypes = {
  menuData: PropTypes.array.isRequired,
  role: PropTypes.string
};
