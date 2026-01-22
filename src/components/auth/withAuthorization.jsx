import { Box, Typography } from "@mui/material";
import { useAuth } from "./AuthContext";

/**
 * A Higher-Order Component (HOC) that protects a component based on user permissions.
 *
 * @param {React.ComponentType} WrappedComponent - The component to protect.
 * @param {string|string[]} requiredPermission - The permission(s) required to view the component.
 * @returns {React.ComponentType|null} - The wrapped component if authorized, or a fallback UI.
 */
const WithAuthorization = (WrappedComponent, requiredPermission) => {
  const AuthorizedComponent = (props) => {
    const { hasPermission } = useAuth();
    if (hasPermission(requiredPermission)) {
      return <WrappedComponent {...props} />;
    }

    // Optional: Render a fallback component, a message, or simply null.
    // You could also redirect the user here using a routing library.
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Box>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              lineHeight: "32.4px",
              color: "#1B1C1E",
            }}
          >
            Access Denied
          </Typography>
        </Box>
        <Box sx={{ mt: 0 }}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "32.4px",
              color: "#111827",
            }}
          >
            You do not have the required permissions to view this page.
          </Typography>
        </Box>
      </div>
    );
  };

  return AuthorizedComponent;
};

export default WithAuthorization;
