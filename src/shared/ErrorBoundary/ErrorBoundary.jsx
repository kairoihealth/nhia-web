import { ErrorBoundary } from "react-error-boundary";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "flex-start"
      }}
    >
      <Typography variant="h4" color="error" sx={{ fontWeight: "bold" }}>
        Oops!!! Something went wrong:
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontStyle: "italic", color: "error.main" }}
      >
        {error.message}
      </Typography>
      <Box sx={{ wordBreak: "break-word" }}>{JSON.stringify(error.stack)}</Box>
      <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </Paper>
  );
}

const myErrorHandler = (error, info) => {
  console.log({ error, info: info.componentStack });
};

const AppErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;

ErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired
};

AppErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
