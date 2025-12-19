import Api from "../../api/Api";
import { ENDPOINTS as e } from "../endpoints";

export const addNewAdmin = async (payload) => {
  try {
    const response = await Api.post(e.ADD_USER, payload);
    return response;
  } catch (error) {
    console.error("Failed to add admin:", error);
    throw error;
  }
};

export const updateAdmin = async (id, payload) => {
  try {
    const response = await Api.put(e.UPDATE_USER(id), payload);
    return response;
  } catch (error) {
    console.error("Failed to update admin:", error);
    throw error;
  }
};

export const getAdmins = async ({ page, pageSize, search, status }) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (search) params.append("search", search);
    if (status) params.append("status", status);

    const response = await Api.get(e.GET_ADMINS, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    throw error;
  }
};

export const addAdminStatus = async (payload) => {
  try {
    const response = await Api.post(e.ADD_ADMIN_STATUS, payload);
    return response;
  } catch (error) {
    console.error("Failed to add admin status:", error);
    throw error;
  }
};

export const updateAdminStatus = async (id, payload) => {
  try {
    const response = await Api.put(e.UPDATE_ADMIN_STATUS(id), payload);
    return response;
  } catch (error) {
    console.error("Failed to update admin status:", error);
    throw error;
  }
};

export const deleteAdminStatus = async (id) => {
  try {
    const response = await Api.delete(e.DELETE_ADMIN_STATUS(id));
    return response;
  } catch (error) {
    console.error("Failed to delete admin status:", error);
    throw error;
  }
};

export const getAdminStatuses = async ({ page, pageSize, search }) => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (search) params.append("search", search);

    const response = await Api.get(e.GET_ADMIN_STATUSES, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin statuses:", error);
    throw error;
  }
};

export const getSingleAdminStatus = async (id) => {
  try {
    const response = await Api.get(e.GET_SINGLE_ADMIN_STATUS(id));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin status:", error);
    throw error;
  }
};

export const getAdminStatusUsers = async (id) => {
  try {
    const response = await Api.get(e.GET_ADMIN_STATUS_USERS(id));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin status users:", error);
    throw error;
  }
};
