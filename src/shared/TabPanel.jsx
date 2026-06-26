import { useState, useRef, useEffect } from "react";
import { Button, Box, Typography, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { FiChevronDown } from "react-icons/fi";

// TabButton Component
export const TabButton = ({ tab, activeTab, label, onClick }) => (
  <Button
    variant="text"
    sx={{
      borderBottom: activeTab === tab ? "2px solid #038F3E" : "none",
      color: activeTab === tab ? "#038F3E" : "#000000",
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

// TabDropdown Component
export const TabDropdown = ({ activeTab, options, onTabClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const activeLabel =
    options.find((option) => option.tab === activeTab)?.label ||
    "Select Category";

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (tab) => {
    onTabClick(tab);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        ref={buttonRef}
        onClick={handleToggle}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          border: "1px solid #E0E0E0",
          borderRadius: "8px",
          backgroundColor: "white",
          cursor: "pointer",
        }}
      >
        <Typography>{activeLabel}</Typography>
        <FiChevronDown
          size={20}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </Box>
      {isOpen && (
        <Box
          ref={dropdownRef}
          sx={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            p: 1,
            zIndex: 10,
            border: "1px solid #E0E0E0",
          }}
        >
          <Stack spacing={0.5}>
            {options.map((option) => (
              <Button
                key={option.tab}
                onClick={() => handleSelect(option.tab)}
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  color: activeTab === option.tab ? "#038F3E" : "inherit",
                  backgroundColor:
                    activeTab === option.tab ? "#F0FDF4" : "transparent",
                  "&:hover": {
                    backgroundColor: "#F0FDF4",
                  },
                }}
              >
                {option.label}
              </Button>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

TabDropdown.propTypes = {
  activeTab: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      tab: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onTabClick: PropTypes.func.isRequired,
};
