import { jwtDecode } from "jwt-decode";

export default class Auth {
  static isAuthenticated() {
    const decodedToken = this.getDecodedJwt();

    if (decodedToken) {
      const { exp } = decodedToken;
      const currentTime = Math.floor(Date.now() / 1000);
      return exp > currentTime;
    }
    return false;
  }

  static setToken(token) {
    localStorage.setItem("token", token);
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static removeToken() {
    localStorage.removeItem("token");
  }

  static getDecodedJwt() {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error("Error decoding JWT:", error);
        return null; // Return null if decoding fails
      }
    }
    return null;
  }
}
