import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Badge,
  Typography,
} from "@mui/material";
import {
  FiLogOut,
  FiUser,
  // FiSettings,
  FiHome,
  FiSettings,
  FiX,
  FiBell,
} from "react-icons/fi";
import Logo from "../assets/nhia-logo.png";
import { TbReportAnalytics } from "react-icons/tb";
import { LuCross } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUnreadNotificationCount } from "../services/general";

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
    {
      id: 6,
      label: "Notifications",
      icon: <FiBell />,
      link: "/hmo/notifications",
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
    {
      id: 6,
      label: "Notifications",
      icon: <FiBell />,
      link: "/provider/notifications",
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
      id: 8,
      label: "Notifications",
      icon: <FiBell />,
      link: "/stateadmin/notifications",
    },
    {
      id: 4,
      label: "Providers & HMO",
      icon: <LuCross />,
      link: "/stateadmin/invitations",
    },
    {
      id: 7,
      label: "Workload",
      icon: <TbReportAnalytics />,
      link: "/stateadmin/workload",
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
      id: 8,
      label: "Notifications",
      icon: <FiBell />,
      link: "/admin/notifications",
    },
    {
      id: 4,
      label: "State Invites",
      icon: <LuCross />,
      link: "/admin/state/invite",
    },
    {
      id: 7,
      label: "Workload",
      icon: <TbReportAnalytics />,
      link: "/admin/workload",
    },
    { id: 5, label: "Profile", icon: <FiUser />, link: "/admin/profile" },
    {
      id: 6,
      label: "Settings",
      icon: <FiSettings />,
      link: "/admin/settings",
    },
  ],
  Enrollee: [
    {
      id: 1,
      label: "Dashboard",
      icon: <FiHome />,
      link: "/enrollee/dashboard",
    },
    {
      id: 2,
      label: "Complaints",
      icon: <FaRegComment />,
      link: "/enrollee/complaints",
    },
    {
      id: 3,
      label: "File New Complaint",
      icon: <FaRegComment />,
      link: "/enrollee/complaint/create",
    },
    {
      id: 4,
      label: "Notifications",
      icon: <FiBell />,
      link: "/enrollee/notifications",
    },
    {
      id: 3,
      label: "Profile",
      icon: <FiUser />,
      link: "/enrollee/profile",
    },
  ],
};

const DashboardSidebar = ({ showMobileMenu, onMobileClose }) => {
  const role = localStorage.getItem("userRole");

  const { data: notificationsCount } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getUnreadNotificationCount(),
  });

  const unreadCount = notificationsCount?.unread_count || 0;

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
        py: 2,
        px: 0,
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
            gap: 1.5,
            mt: 3,
            flexGrow: 1,
            pl: 2,
          }}
        >
          {menuData[role]?.length > 0 ? (
            menuData[role].map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                onClick={onMobileClose}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "#1B5E20" : "rgba(255,255,255,.6)",
                  backgroundColor: isActive ? "#FFFFFF" : "transparent",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                })}
              >
                {({ isActive }) => {
                  const isNotifications = item.label === "Notifications";
                  return (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {item.icon}
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: isActive ? 600 : 500,
                          lineHeight: "21.6px",
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          color: isActive ? "#1B5E20" : "rgba(255,255,255,.6)",
                        }}
                      >
                        {item.label}{" "}
                        {isNotifications && (
                          <Badge
                            badgeContent={unreadCount}
                            color="error"
                          ></Badge>
                        )}
                      </Typography>
                    </Box>
                  );
                }}
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
          background: "#1B5E20",
          color: "rgba(255,255,255,.6)",
          border: "none",
          paddingLeft: "16px",
          fontSize: "15px",
          width: "100%",
        }}
      >
        <ListItem
          component="button"
          onClick={logout}
          sx={{
            color: "rgba(255,255,255,.6)",
            background: "#1B5E20",
            textAlign: "left",
            border: "none",
            padding: "12px 14px",
            gap: 2,
            cursor: "pointer",
          }}
        >
          <ListItemIcon sx={{ minWidth: "unset" }}>
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
            backgroundColor: "#1B5E20",
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
          width: 230,
          flexShrink: 0,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#1B5E20",
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
