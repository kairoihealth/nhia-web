import { createContext, useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";

// Define the shape of the context
const AuthContext = createContext({
  permissions: [],
  hasPermission: () => false,
});

/**
 * The provider component that makes authentication data available to any
 * child component that calls the `useAuth` hook.
 */
export const AuthProvider = ({ children }) => {
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // In a real-world app, you might fetch permissions from an API after login.
    // For this example, we'll retrieve them from localStorage.
    try {
      const storedPermissions = localStorage.getItem("permissions");
      if (storedPermissions) {
        setPermissions(JSON.parse(storedPermissions));
      }
    } catch (error) {
      console.error(
        "Failed to parse user permissions from localStorage:",
        error,
      );
      setPermissions([]);
    }
  }, []);

  /**
   * Checks if the user has a specific permission or a set of permissions.
   * @param {string|string[]} requiredPermissions - The permission(s) to check for.
   * @returns {boolean} - True if the user has the required permission(s).
   */
  const hasPermission = (requiredPermissions) => {
    if (!requiredPermissions) {
      return true; // No specific permission is required, so access is granted.
    }

    const required = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions];
    // Check if the user's permissions array includes ALL of the required permissions.
    return required.every((permission) => permissions.includes(permission));
  };

  // Use useMemo to prevent re-creating the context value on every render
  const value = useMemo(
    () => ({
      permissions,
      hasPermission,
    }),
    [permissions],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to easily access the authentication context.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
