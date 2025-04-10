import { jwtDecode } from "jwt-decode";

const Auth = {
  getToken: () => {
    return localStorage.getItem("access_token");
  },

  setToken: (token) => {
    localStorage.setItem("access_token", token);
  },

  removeToken: () => {
    localStorage.removeItem("access_token");
  },

  isAuthenticated: () => {
    const token = Auth.getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check for token expiration
        if (decoded.exp > Date.now() / 1000) {
          return true; // Token is valid
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return false; // Token is missing or invalid
  },

  getDecodedJwt: () => {
    const token = Auth.getToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return decoded;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  }
};

export default Auth;
