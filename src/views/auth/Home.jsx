import PropTypes from "prop-types";
import { Box, Typography, Card, Link as MuiLink } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import TwoColumnLayout from "../enrolees/ComplaintForm/TwoColumnLayout";
import FormCardHeader from "../enrolees/ComplaintForm/FormCardHeader";

const OptionCard = ({ icon, title, subtitle, onClick, ...props }) => (
  <Card
    onClick={onClick}
    sx={{
      p: 1.5,
      cursor: "pointer",
      border: "1.5px solid #E0E0E0",
      borderRadius: "12px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#1B5E20",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
      },
      display: "flex",
      alignItems: "center",
      gap: 1.5,
    }}
    {...props}
  >
    <Box sx={{ color: "#1B5E20" }}>{icon}</Box>
    <Box sx={{ flexGrow: 1 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#1B1C1E" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: "12px", color: "#595959", mt: 0.5 }}>
        {subtitle}
      </Typography>
    </Box>
    <ArrowForwardIcon sx={{ color: "#1B5E20" }} />
  </Card>
);

OptionCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Home = () => {
  const navigate = useNavigate();

  const options = [
    {
      id: 1,
      title: "Submit a new complaint",
      subtitle: "File a new complaint as an enrollee.",
      icon: <NoteAddOutlinedIcon sx={{ fontSize: 28 }} />, // This icon is fine
      onClick: () => navigate("/create-complaint"), // This route is handled by Enrollee.jsx
    },
    {
      id: 2,
      title: "Enrollee Login",
      subtitle: "Access your enrollee portal.",
      icon: <PersonOutlineIcon sx={{ fontSize: 28 }} />,
      onClick: () => navigate("/login", { state: { from: "enrollee" } }),
    },
    {
      id: 3,
      title: "Staff / HMO / Provider Login",
      subtitle: "Access for authorized personnel.",
      icon: <GroupsOutlinedIcon sx={{ fontSize: 28 }} />,
      onClick: () => navigate("/login", { state: { from: "staff" } }),
    },
  ];

  return (
    <TwoColumnLayout
      title="NHIA Complaint Management System"
      subtitle="Nigeria's national platform for health insurance complaints. Submit, track, and resolve complaints across all 36 states and FCT."
      rightColumnSx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: "60%", md: "70%", lg: "56%" },
          textAlign: "start",
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",
          border: "1px solid #F0F0F0",
        }}
      >
        <FormCardHeader
          title="Welcome"
          subtitle=" How would you like to proceed?"
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {options.map((option) => (
            <OptionCard
              key={option.id}
              icon={option.icon}
              title={option.title}
              subtitle={option.subtitle}
              onClick={option.onClick}
            />
          ))}
        </Box>

        <Typography
          sx={{
            mt: 1.5,
            textAlign: "center",
            fontSize: "13px",
            fontWeight: 500,
            color: "#6B6B6B",
          }}
        >
          Have a Case ID?{" "}
          <MuiLink
            href="/enrollee-complaint-review"
            underline="hover"
            sx={{ color: "#1B5E20", cursor: "pointer", fontWeight: 600 }}
          >
            Track Complaint
          </MuiLink>
        </Typography>
      </Card>
    </TwoColumnLayout>
  );
};

export default Home;
