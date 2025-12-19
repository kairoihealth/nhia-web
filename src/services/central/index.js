import Api from "../../api/Api";
import { ENDPOINTS as e } from "../../services/endpoints";

export const inviteUser = async (payload) => {
  try {
    const response = await Api.post(e.SEND_INVITATION, payload);
    return response;
  } catch (error) {
    console.error("Invite user failed:", error);
    throw error;
  }
};

export const inviteStateUser = async (payload) => {
  try {
    const response = await Api.post(e.INVITE_STATE, payload);
    return response;
  } catch (error) {
    console.error("Invite user failed:", error);
    throw error;
  }
};

export const getUsers = async ({
  is_active,
  ordering,
  page,
  pageSize,
  role,
  search,
  state,
  hmo,
  provider,
}) => {
  try {
    const params = new URLSearchParams();
    if (is_active) params.append("is_active", is_active ? "true" : "false");
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (role) params.append("role", role.toString());
    if (search) params.append("search", search);
    if (state) params.append("state", state.toString());
    if (hmo) params.append("hmo", hmo.toString());
    if (provider) params.append("provider", provider.toString());

    const response = await Api.get(e.GET_USERS, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const getSingleUser = async (id) => {
  try {
    const response = await Api.get(e.GET_SINGLE_USER(id));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

export const getSingleUserWithToken = async (id, token = "") => {
  try {
    const response = await Api.get(e.GET_SINGLE_USER(id), {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${
          token || localStorage.getItem("access_token")
        }`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

export const userUpdateProfile = async ({ id, payload }) => {
  try {
    const response = await Api.patch(e.UPDATE_PROFILE(id), payload);
    return response;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};
