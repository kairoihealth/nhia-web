import Api from "../../api/Api";
import { ENDPOINTS as e } from "../endpoints";

export const getComplaints = async ({
  ordering,
  page,
  pageSize,
  search,
  state,
  status
}) => {
  try {
    const params = new URLSearchParams();
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (search) params.append("search", search);
    if (state) params.append("state", state.toString());
    if (status) params.append("status", status);

    const response = await Api.get(e.GET_COMPLAINTS, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch complaints:", error);
    throw error;
  }
};

export const getNewComplaints = async ({
  ordering,
  page,
  pageSize,
  status
}) => {
  try {
    const params = new URLSearchParams();
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (status) params.append("status", status);

    const response = await Api.get(e.GET_COMPLAINTS, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch complaints:", error);
    throw error;
  }
};

export const getSingleComplaint = async (id) => {
  try {
    const response = await Api.get(e.GET_SINGLE_COMPLAINT(id));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch complaint:", error);
    throw error;
  }
};

export const getComplaintResponses = async (id) => {
  try {
    const response = await Api.get(e.GET_COMPLAINT_RESPONSES(id));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch complaint responses", error);
    throw error;
  }
};

export const addComplaint = async (payload) => {
  try {
    const response = await Api.post(e.ADD_COMPLAINTS, payload);
    return response;
  } catch (error) {
    console.error("Failed to submit complaint:", error);
    throw error;
  }
};

export const respondToComplaint = async (payload) => {
  try {
    const response = await Api.post(e.RESPOND_TO_COMPLAINTS, payload);
    return response;
  } catch (error) {
    console.error("Failed to respond to complaint:", error);
    throw error;
  }
};
