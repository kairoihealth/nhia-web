import { Box } from "@mui/material";
import PropTypes from "prop-types";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardTopbar from "../components/DashboardTopbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = ({ username, role }) => {
  // Retrieve role dynamically if not passed as a prop
  const userRole = role || localStorage.getItem("userRole");
  const fullname = username || localStorage.getItem("fullname");

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
        <DashboardSidebar role={userRole} />
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
          sx={
            {
              // height: "70px", // Fixed height for the topbar
              // // px: 3,
              // // py: 2,
              // backgroundColor: "#038F3E",
              // color: "#ffffff",
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "space-between",
            }
          }
        >
          <DashboardTopbar username={fullname} role={userRole} />
        </Box>

        {/* Children (Content) */}
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            p: 2.5,
            overflowY: "auto",
            height: "calc(100% - 64px)",
            zIndex: 9999,
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
  role: PropTypes.string,
  username: PropTypes.string,
};

export default DashboardLayout;
