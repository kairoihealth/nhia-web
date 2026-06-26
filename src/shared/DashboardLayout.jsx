import { useState } from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ username }) => {
  // Retrieve role dynamically if not passed as a prop
  // const userRole = role || localStorage.getItem("userRole");
  const fullname = username || localStorage.getItem("fullname");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#FAFAFA",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <DashboardSidebar
        showMobileMenu={isMobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          // ml: "269px", // Offset for the sidebar width
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Topbar */}
        <Box component="header">
          <DashboardTopbar
            username={fullname}
            onMobileMenuClick={() => setMobileMenuOpen(true)}
          />
        </Box>

        {/* Children (Content) */}
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            p: 2.5,
            overflowY: "auto",
            height: "calc(100vh - 88px)", // Adjust based on Topbar height
            backgroundColor: "#ffffff",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
  username: PropTypes.string,
};

export default DashboardLayout;
