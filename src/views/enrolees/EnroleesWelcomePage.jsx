import PropTypes from "prop-types";
import { Box, Typography, Card, Link as MuiLink } from "@mui/material";
import Logo from "../../assets/nhia-logo.png";
import KairoiLogo from "../../assets/kairoi-logo.png";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const OptionCard = ({ title, subtitle, onClick, ...props }) => (
  <Card
    onClick={onClick}
    sx={{
      p: 2,
      cursor: "pointer",
      border: "1px solid #E0E0E0",
      borderRadius: "12px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#1B5E20",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
      },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
    {...props}
  >
    <Box>
      <Typography sx={{ fontSize: "18px", fontWeight: 500, color: "#1B1C1E" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: "14px", color: "#595959", mt: 0.5 }}>
        {subtitle}
      </Typography>
    </Box>
    <ArrowForwardIcon sx={{ color: "#1B5E20" }} />
  </Card>
);

OptionCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const EnroleesWelcomePage = () => {
  const navigate = useNavigate();

  const options = [
    {
      id: 1,
      title: "Submit a new complaint",
      subtitle: "File a new complaint as an enrollee.",
      onClick: () => navigate("/enrollee"),
    },
    {
      id: 2,
      title: "Enrollee Login",
      subtitle: "Access your enrollee portal.",
      onClick: () => navigate("/login"), // Assuming this is the correct path
    },
    {
      id: 3,
      title: "Admin / HMO / Provider Login",
      subtitle: "Access for authorized personnel.",
      onClick: () => navigate("/login"),
    },
  ];

  return (
    <Box sx={{ display: { xs: "grid", md: "flex" }, height: "100vh" }}>
      {/* Left Column */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          backgroundColor: "#1B5E20",
          color: "#fff",
          p: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: { xs: "center", md: "flex-start" },
          position: "relative",
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
            width: { xs: "100%", md: "80%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "32px", md: "58px" },
              fontWeight: 600,
              lineHeight: { xs: "43.2px", md: "68.3px" },
              mt: { xs: 2, md: 5 },
              textAlign: { xs: "center", md: "left" },
              width: { xs: "90%", md: "90%" },
            }}
          >
            Welcome to NHIA Complaint Management System
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 400,
              lineHeight: { xs: "27px", md: "32.4px" },
              mt: 3,
              textAlign: { xs: "center", md: "left" },
              width: { xs: "70%", md: "90%" },
            }}
          >
            Welcome aboard! Your complaints fuel our quest for service
            perfection.
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
          width: { xs: "100%", md: "50%" },
          p: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: { xs: "90%", md: "70%" } }}>
          <Typography
            sx={{
              fontSize: { xs: "24px", sm: "32px" },
              fontWeight: 600,
              lineHeight: { xs: "32px", md: "43.2px" },
              color: "#1B5E20",
              textAlign: "center",
              mb: 4,
            }}
          >
            Welcome,
            <br />
            How would you like to proceed?
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {options.map((option) => (
              <OptionCard
                key={option.id}
                title={option.title}
                subtitle={option.subtitle}
                onClick={option.onClick}
              />
            ))}
          </Box>

          <Typography
            sx={{
              mt: 4,
              textAlign: "center",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Have a Case ID?{" "}
            <MuiLink
              href="/enrollee-complaint-review"
              underline="hover"
              sx={{ color: "#1B5E20", cursor: "pointer" }}
            >
              Track Complaint
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EnroleesWelcomePage;
