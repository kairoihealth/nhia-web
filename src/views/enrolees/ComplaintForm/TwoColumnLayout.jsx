import { Box, Typography } from "@mui/material";
import Logo from "../../../assets/nhia-logo.png";
import KairoiLogo from "../../../assets/kairoi-logo.png";
import PropTypes from "prop-types";

const TwoColumnLayout = ({
  children,
  rightColumnSx,
  title = "NHIA Complaint Management System",
  subtitle = "Nigeria's national platform for health insurance complaints. Submit, track, and resolve complaints across all 36 states and FCT.",
}) => {
  return (
    <Box sx={{ display: { xs: "grid", md: "flex" }, minHeight: "100vh" }}>
      {/* Left Column */}
      <Box
        sx={{
          width: { xs: "100%", md: "32%", lg: "27%" },
          backgroundColor: "#1B5E20",
          color: "#fff",
          px: { xs: 5, sm: 16, md: 4, lg: 6 },
          py: { xs: 5, sm: 6, md: 4, lg: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", md: "start" },
          alignItems: { xs: "center", md: "flex-start" },
          position: { xs: "relative", md: "sticky" },
          top: 0,
          height: { xs: "auto", md: "100vh" },
        }}
      >
        <Box>
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{ width: { xs: "70px", md: "100px" } }}
          />
        </Box>
        <Box
          sx={{
            // width: { xs: "100%", md: "80%" },
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "22px", md: "27px" },
              fontWeight: 600,
              lineHeight: { xs: "1.2", md: "1.3" },
              mt: { xs: 2, md: 5 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {title || "Welcome to NHIA Complaint Management System"}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "13px", md: "15px" },
              fontWeight: 400,
              lineHeight: { xs: "1.65", md: "1.65" },
              mt: 2,
              textAlign: { xs: "center", md: "left" },
              color: "#66BB6A",
              // width: { xs: "70%", md: "90%" },
            }}
          >
            {subtitle ||
              "Welcome aboard! Your complaints fuel our quest for service perfection."}
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            mt: 5,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "32.4px" }}
            >
              Powered by
            </Typography>
            <Box
              component="img"
              src={KairoiLogo}
              alt="KairoiLogo"
              sx={{ width: "70px" }}
            />
          </Box>
        </Box>
      </Box>

      {/* Right Column */}
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 4 },
          ...rightColumnSx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

TwoColumnLayout.propTypes = {
  children: PropTypes.node.isRequired,
  rightColumnSx: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default TwoColumnLayout;
