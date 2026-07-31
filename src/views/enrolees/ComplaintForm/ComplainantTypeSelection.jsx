import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Card, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TwoColumnLayout from "./TwoColumnLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormCardHeader from "./FormCardHeader";

const OptionCard = ({
  icon,
  title,
  subtitle,
  value,
  selected,
  onSelect,
  ...props
}) => (
  <Card
    onClick={() => onSelect(value)}
    sx={{
      p: 1.7,
      cursor: "pointer",
      borderRadius: "12px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#1B5E20",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: selected ? "#E8F5E9" : "#fff",
      border: selected ? "2px solid #1B5E20" : "1.5px solid #E0E0E0",
    }}
    {...props}
  >
    <Box sx={{ color: "#1B5E20" }}>{icon}</Box>
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: 700,
        color: selected ? "#1B5E20" : "#3D3D3D",
        lineHeight: "1.2",
        mt: 1,
        mb: 0.5,
      }}
    >
      {title}
    </Typography>
    <Typography sx={{ fontSize: "12px", color: "#6B6B6B", lineHeight: "1.2" }}>
      {subtitle}
    </Typography>
  </Card>
);

OptionCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const ComplainantTypeSelection = ({
  selectedAccountType,
  setSelectedAccountType,
  onNext,
  onBack,
  btn,
}) => {
  const options = [
    {
      id: 1,
      value: "Enrollee",
      title: "I am an Enrollee",
      subtitle: "NHIA registered member",
      icon: <PersonOutlineIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 2,
      value: "HMO",
      title: "I am an HMO",
      subtitle: "Health Maintenance Organisation",
      icon: <BusinessOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 3,
      value: "Provider",
      title: "I am a Provider",
      subtitle: "Hospital, clinic, or pharmacy",
      icon: <LocalHospitalOutlinedIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 4,
      value: "Employer",
      title: "Employer / NGO",
      subtitle: "Filing on behalf of an organisation",
      icon: <WorkOutlineIcon sx={{ fontSize: 40 }} />,
    },
  ];

  const handleSelect = (value) => {
    setSelectedAccountType(value);
  };

  const handleSubmit = () => {
    if (!selectedAccountType) {
      alert("Please select a complainant type to proceed.");
      return;
    }
    onNext();
  };

  return (
    <TwoColumnLayout
      title="Who are you filing on behalf of?"
      subtitle="Selecting the right category ensures we request the correct information and route your complaint accurately."
      rightColumnSx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: "70%", md: "85%", lg: "57%" },
          textAlign: "start",
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",
          border: "1px solid #F0F0F0",
        }}
      >
        <FormCardHeader
          title="Choose complainant type"
          subtitle="Select the option that best describes you."
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {options.map((option) => (
            <OptionCard
              key={option.id}
              icon={option.icon}
              title={option.title}
              subtitle={option.subtitle}
              value={option.value}
              selected={selectedAccountType === option.value}
              onSelect={handleSelect}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              width: "87px",
              height: "48px",
              borderRadius: "16px",
              py: 1.5,
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: 500,
              lineHeight: "24px",
              textTransform: "capitalize",
              borderColor: "#1B5E20",
              color: "#1B5E20",
              "&:hover": { borderColor: "#1B5E20" },
            }}
            onClick={onBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              maxWidth: "170px",
              height: "48px",
              borderRadius: "16px",
              py: 1.5,
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: 500,
              lineHeight: "24px",
              textTransform: "capitalize",
              backgroundColor: "#1B5E20",
              "&:hover": { backgroundColor: "#1B5E20" },
            }}
            onClick={handleSubmit}
            disabled={!selectedAccountType}
          >
            Save & Continue
          </Button>
        </Box>
      </Card>
    </TwoColumnLayout>
  );
};

ComplainantTypeSelection.propTypes = {
  selectedAccountType: PropTypes.string.isRequired,
  setSelectedAccountType: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func, // Optional as it's the first step
  btn: PropTypes.node,
};

export default ComplainantTypeSelection;
