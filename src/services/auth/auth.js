import Api from "../../api/Api";
import { ENDPOINTS as e } from "../endpoints";

export const userLogin = async (email, password) => {
  try {
    const response = await Api.post(
      e.LOGIN,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const setUpAccount = async (payload) => {
  try {
    const response = await Api.post(e.SETUP_ACCOUNT, payload);
    return response;
  } catch (error) {
    console.error("Account setup failed:", error);
    throw error;
  }
};

export const userChangePassword = async (payload) => {
  try {
    const response = await Api.post(e.CHANGE_PASSWORD, payload);
    return response;
  } catch (error) {
    console.error("Password change failed:", error);
    throw error;
  }
};

export const userForgotPassword = async (email) => {
  try {
    const response = await Api.post(e.FORGOT_PASSWORD, { email });
    return response;
  } catch (error) {
    console.error("Forgot password request failed:", error);
    throw error;
  }
};

export const userResetPassword = async (payload) => {
  try {
    const response = await Api.post(e.RESET_PASSWORD, payload);
    return response;
  } catch (error) {
    console.error("Password reset failed:", error);
    throw error;
  }
};
