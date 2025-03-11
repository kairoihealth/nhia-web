import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  Typography
} from "@mui/material";

const SearchFilter = ({
  placeholder,
  searchValue,
  width,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        justifyContent: "space-between",
        width: "100%",
        p: 2
      }}
    >
      <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
        <TextField
          variant="outlined"
          placeholder={placeholder}
          value={searchValue}
          onChange={onSearchChange}
          sx={{
            width: { width },
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#FFFFFF",
              color: "#737373",
              border: "0.5px solid #DADADA",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#038F3E"
              }
            }
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: "118px",
            borderRadius: "8px",
            backgroundColor: "#038F3E",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            textTransform: "none"
          }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography>Sort by:</Typography>
        <Select
          value={filterValue}
          onChange={onFilterChange}
          variant="outlined"
          sx={{ backgroundColor: "#fff", height: "38px", borderRadius: "8px" }}
        >
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default SearchFilter;

SearchFilter.propTypes = {
  placeholder: PropTypes.string,
  searchValue: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
};
