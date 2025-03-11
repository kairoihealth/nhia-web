import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import SuccessModal from "../../../shared/SuccessModal";
import { useState } from "react";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#737373",
    border: "0.5px solid #DADADA",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E"
    }
  }
};

const selectStyles = {
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "#F5F5F5",
  color: "#737373",
  border: "0.5px solid #DADADA",
  fontSize: "16px",
  outline: "none",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#038F3E"
  }
};
const StateInvitationForm = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = () => {
    setModalOpen(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "28px",
          color: "#101828"
        }}
      >
        Send Invite
      </Typography>

      {/* Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "40%",
          py: 4
        }}
      >
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              color: "#595959",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            Official Email Address
            <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            required
            placeholder="enter@gmail.com"
            sx={textFieldStyles}
          />
        </Box>

        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              color: "#595959",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            State
            <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
          </Typography>
          <FormControl fullWidth variant="outlined">
            <Select sx={selectStyles}>
              <MenuItem
                value=""
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#737373"
                }}
              >
                Select State
              </MenuItem>
              <MenuItem value="lagos">Lagos</MenuItem>
              <MenuItem value="kano">Kano</MenuItem>
              <MenuItem value="abuja">Abuja</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              color: "#595959",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            Region
            <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
          </Typography>
          <FormControl fullWidth variant="outlined">
            <Select sx={selectStyles}>
              <MenuItem
                value=""
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#737373"
                }}
              >
                Select Region
              </MenuItem>
              <MenuItem value="north-central">North Central</MenuItem>
              <MenuItem value="north-east">North East</MenuItem>
              <MenuItem value="north-west">North West</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Button */}
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <Button
            variant="contained"
            size="medium"
            onClick={handleSubmit}
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "21.6px",
              borderRadius: "8px",
              backgroundColor: "#038F3E",
              color: "#FFFFFF",
              width: "347px",
              py: "12px",
              px: "8px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#027A3B" }
            }}
          >
            Send Invitation
          </Button>
        </Box>
      </Box>

      {/* Modal */}
      <SuccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Invite Sent"
        message="You have successfully sent an invite to"
        recipient="Federal Medical Center, UYO."
      />
    </Box>
  );
};

export default StateInvitationForm;
