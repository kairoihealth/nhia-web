import axios from "axios";
import Auth from "./Auth";

const Api = axios.create({
  baseURL:
    import.meta.env.VITE_APP_BASE_URL || "http://142.93.170.222:46001/api/v1",
});
// "https://svz3mxw8-46000.uks1.devtunnels.ms/api/v1",

Api.interceptors.request.use(
  (config) => {
    if (Auth.isAuthenticated()) {
      const token = Auth.getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        console.log("Adding token:", token);
      } else {
        console.warn("No token available.");
      }
    }
    // config.headers["Client-Authorization"] =
    //   import.meta.env.VITE_APP_CLIENT_KEY;

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => {
    if (response.status === 208) {
      throw response;
    }
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response); // Log response error
    return Promise.reject(error);
  }
);

export default Api;
