import { Box, Button, Typography } from "@mui/material";
// import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const EmailVerifiedSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || ""; // Get email from query params
  // const role = queryParams.get("role") || ""; // Get role from query params

  // Function to handle redirection to the appropriate dashboard
  // const handleRedirectToDashboard = () => {
  //   let dashboardRoute = "/unknown-dashboard"; // Default route

  //   if (role === "hmo") {
  //     dashboardRoute = "/hmo-dashboard";
  //   } else if (role === "provider") {
  //     dashboardRoute = "/providers-dashboard";
  //   } else if (role === "state") {
  //     dashboardRoute = "/state-dashboard";
  //   } else if (role === "central") {
  //     dashboardRoute = "/central-dashboard";
  //   }

  //   navigate(dashboardRoute, { state: { email, role } }); // Pass email and role as state
  // };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "43.2px",
            color: "#038F3E"
          }}
        >
          Email Verified
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "21.6px",
            color: "#475467",
            width: "360px"
          }}
        >
          Your email ({email}) has been successfully verified. Click below to
          continue.
        </Typography>
      </Box>
      <Button
        variant="contained"
        type="submit"
        // href="/dashboard"
        // onClick={onContinueToDashboard}
        // onClick={handleRedirectToDashboard}
        onClick={handleLogin}
        sx={{
          width: "360px",
          height: "56px",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "21.6px",
          py: "10px",
          px: "18px",
          borderRadius: "50px",
          backgroundColor: "#038F3E",
          my: 3,
          textTransform: "none"
        }}
      >
        Continue to Login
      </Button>

      {/* <Button
        variant="text"
        onClick={onBackToLogin}
        sx={{
          color: "#038F3E",
          mt: 2,
          textDecoration: "none"
        }}
      >
        Back to Login
      </Button> */}
    </>
  );
};

export default EmailVerifiedSection;

// EmailVerifiedSection.propTypes = {
//   onBackToLogin: PropTypes.func.isRequired,
//   email: PropTypes.string.isRequired,
//   onContinueToDashboard: PropTypes.func.isRequired
// };
