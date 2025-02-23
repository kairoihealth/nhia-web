import { Box } from "@mui/material";
import PropTypes from "prop-types";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";

const DashboardLayout = ({ children, role }) => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#FAFAFA",
        height: "100vh",
        width: "100vw",
        overflow: "hidden"
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          position: "fixed",
          width: "269px",
          height: "auto",
          zIndex: 1000,
          overflowY: "auto",

        }}
      >
        <DashboardSidebar role={role} />
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          ml: "269px", // Offset for the sidebar width
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
      {/* Topbar */}
      <Box
         sx={{
          height: "70px", // Fixed height for the topbar
          // px: 3,
          py: 2,
          backgroundColor: "#038F3E",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <DashboardTopbar role={role}/>
      </Box>

      {/* Children (Content) */}
      <Box
          sx={{
            flexGrow: 1,
            p: 2.5,
            overflowY: "auto", // Enable scrolling for the main content area
            height: "calc(100% - 64px)", // Subtract the topbar height
          }}
      >
        {children}   
      </Box>
      </Box>

    </Box>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
    role: PropTypes.string
};

export default DashboardLayout;
