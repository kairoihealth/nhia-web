import { Modal, Box, Typography } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PropTypes from "prop-types";
import success from "../assets/success.png";

const SuccessModal = ({ open, onClose, recipient, message, title }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "55%",
          transform: "translate(-50%, -50%)",
          width: "657px",
          bgcolor: "background.paper",
          boxShadow: 24,
          py: "80px",
          px: "60px",
          borderRadius: "10px",
          textAlign: "center"
        }}
      >
        {/* <CheckCircleIcon sx={{ fontSize: 50, color: "#038F3E" }} /> */}
        <img
          src={success}
          alt="Success"
          style={{ width: "98px", height: "98px" }}
        />
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 500,
            color: "#111827",
            mt: 2
          }}
        >
          {title || "Success"}
        </Typography>
        <Typography
          sx={{ fontSize: "16px", fontWeight: 500, mt: 1, color: "#0D3020" }}
        >
          {message} <span style={{ fontWeight: 600 }}>{recipient}</span>
        </Typography>
      </Box>
    </Modal>
  );
};

export default SuccessModal;

SuccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  recipient: PropTypes.string,
  message: PropTypes.string,
  title: PropTypes.string
};
