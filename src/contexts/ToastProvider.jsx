import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";

const ToastContext = createContext(undefined);

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

  return (
    <ToastContext.Provider value={{ showToast }}>
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

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired
};
