import PropTypes from "prop-types";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { FiBell } from "react-icons/fi";
import SearchIcon from "@mui/icons-material/Search";

const DashboardTopbar = ({
  username,
  // role
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        padding: "1rem",
        width: "100%",
        height: "88px",
        px: 2,
        // borderRadius: "0px 0px 8px 8px",
        boxShadow: "0px 1px 0px 0px #12203B17",
        // borderBottom: "1px solid #E0E0E0",
      }}
    >
      {/* Welcome Message */}
      <Typography variant="h6" fontWeight="bold">
        Welcome, {username}
        {/* {role} */}
      </Typography>

      <Box sx={{ width: "603px" }}>
        <TextField
          placeholder="Type to search"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              color: "#A1A1AA",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              "& fieldset": {
                borderColor: "#E4E4E7",
              },
              "&:hover fieldset": {
                borderColor: "#cccccc",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#E4E4E7",
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* <IconButton>
          <FiSearch size={20} color="#000000" />
        </IconButton> */}
        <IconButton
          sx={{ backgroundColor: "#F8F8F8", border: "0.64px solid #DADADA" }}
        >
          <FiBell size={20} color="#000000" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DashboardTopbar;

DashboardTopbar.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
};
