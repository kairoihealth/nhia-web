import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";
import { ToastContext } from "./ToastContext";

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    severity: "success",
    open: false
  });

  const showToast = (message, severity) => {
    setToast({ message, severity, open: true });
  };

  const handleClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleSuccess = (title, message) => {
    showToast(`${title}: ${message}`, "success");
  };

  const handleError = (title, message) => {
    showToast(`${title}: ${message}`, "error");
  };

  return (
    <ToastContext.Provider value={{ showToast, handleSuccess, handleError }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired
};
