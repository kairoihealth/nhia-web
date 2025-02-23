import { Button } from "@mui/material";
import PropTypes from "prop-types";

// TabButton Component
export const TabButton = ({ tab, activeTab, label, onClick }) => (
  <Button
    variant="text"
    sx={{
      borderBottom: activeTab === tab ? "2px solid #038F3E" : "none",
      color: activeTab === tab ? "#038F3E" : "#737373",
      fontWeight: activeTab === tab ? "bold" : "normal",
      textTransform: "none",
      mr: 2,
      mb: 1,
      "&:hover": {
        color: "#038F3E",
      },
    }}
    onClick={() => onClick(tab)}
  >
    {label}
  </Button>
);

TabButton.propTypes = {
  tab: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};