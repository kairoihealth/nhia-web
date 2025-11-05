import Api from "../../api/Api";
import { ENDPOINTS as e } from "../endpoints";

export const getComplaints = async ({
  ordering,
  page,
  pageSize,
  search,
  state,
  status,
  start_date,
  end_date,
  state_id,
  region_id,
  type,
  category,
  hmo_id,
  provider_id,
  enrollee,
  complaint_type,
  complaint_category,
  complaint_against,
  priority,
  assigned_to,
  date_filter,
}) => {
  try {
    const params = new URLSearchParams();
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (search) params.append("search", search);
    if (state) params.append("state", state.toString());
    if (status) params.append("status", status);
    if (start_date) params.append("start_date", start_date);
    if (end_date) params.append("end_date", end_date);
    if (state_id) params.append("state_id", state_id);
    if (region_id) params.append("region_id", region_id);
    if (type) params.append("type", type);
    if (category) params.append("category", category);
    if (hmo_id) params.append("hmo_id", hmo_id);
    if (provider_id) params.append("provider_id", provider_id);
    if (enrollee) params.append("enrollee", enrollee);
    if (complaint_type) params.append("complaint_type", complaint_type);
    if (complaint_category)
      params.append("complaint_category", complaint_category);
    if (complaint_against)
      params.append("complaint_against", complaint_against);
    if (priority) params.append("priority", priority);
    if (assigned_to) params.append("assigned_to", assigned_to);
    if (date_filter) params.append("date_filter", date_filter);

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
  status,
  state_id,
  region_id,
}) => {
  try {
    const params = new URLSearchParams();
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (status) params.append("status", status);
    if (state_id) params.append("state_id", state_id);
    if (region_id) params.append("region_id", region_id);

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

export const updateComplaintStatus = async ({ id, payload }) => {
  try {
    const response = await Api.post(e.UPDATE_COMPLAINT_STATUS(id), payload);
    return response;
  } catch (error) {
    console.error("Failed to update complaint status:", error);
    throw error;
  }
};

export const getComplaintSatisfactionScores = async ({
  start_date,
  end_date,
  region_id,
  state_id,
  hmo_id,
  provider_id,
  enrollee,
  date_filter,
}) => {
  const params = new URLSearchParams();
  if (start_date) params.append("start_date", start_date);
  if (end_date) params.append("end_date", end_date);
  if (region_id) params.append("region_id", region_id);
  if (state_id) params.append("state_id", state_id);
  if (hmo_id) params.append("hmo_id", hmo_id);
  if (provider_id) params.append("provider_id", provider_id);
  if (enrollee) params.append("enrollee", enrollee);
  if (date_filter) params.append("date_filter", date_filter);

  try {
    const response = await Api.get(e.GET_COMPLAINT_SATISFACTION_SCORES, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch scores:", error);
    throw error;
  }
};

export const getComplaintStats = async ({
  start_date,
  end_date,
  region_id,
  state_id,
  hmo_id,
  provider_id,
  enrollee,
  date_filter,
}) => {
  const params = new URLSearchParams();
  if (start_date) params.append("start_date", start_date);
  if (end_date) params.append("end_date", end_date);
  if (region_id) params.append("region_id", region_id);
  if (state_id) params.append("state_id", state_id);
  if (hmo_id) params.append("hmo_id", hmo_id);
  if (provider_id) params.append("provider_id", provider_id);
  if (enrollee) params.append("enrollee", enrollee);
  if (date_filter) params.append("date_filter", date_filter);

  try {
    const response = await Api.get(e.GET_COMPLAINT_STATS, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch complaint stats:", error);
    throw error;
  }
};

export const getComplaintTrends = async ({
  start_date,
  end_date,
  region_id,
  state_id,
  hmo_id,
  provider_id,
  enrollee,
  date_filter,
}) => {
  const params = new URLSearchParams();
  if (start_date) params.append("start_date", start_date);
  if (end_date) params.append("end_date", end_date);
  if (region_id) params.append("region_id", region_id);
  if (state_id) params.append("state_id", state_id);
  if (hmo_id) params.append("hmo_id", hmo_id);
  if (provider_id) params.append("provider_id", provider_id);
  if (enrollee) params.append("enrollee", enrollee);
  if (date_filter) params.append("date_filter", date_filter);

  try {
    const response = await Api.get(e.GET_COMPLAINT_TRENDS, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch complaint trends:", error);
    throw error;
  }
};

export const getComplaintTrendsByOrganisation = async ({
  start_date,
  end_date,
  region_id,
  state_id,
  hmo_id,
  provider_id,
  enrollee,
  date_filter,
}) => {
  const params = new URLSearchParams();
  if (start_date) params.append("start_date", start_date);
  if (end_date) params.append("end_date", end_date);
  if (region_id) params.append("region_id", region_id);
  if (state_id) params.append("state_id", state_id);
  if (hmo_id) params.append("hmo_id", hmo_id);
  if (provider_id) params.append("provider_id", provider_id);
  if (enrollee) params.append("enrollee", enrollee);
  if (date_filter) params.append("date_filter", date_filter);

  try {
    const response = await Api.get(e.GET_COMPLAINT_TRENDS_BY_ORG, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch complaint trends:", error);
    throw error;
  }
};
