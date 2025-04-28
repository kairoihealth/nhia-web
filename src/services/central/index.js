import Api from "../../api/Api";
import { ENDPOINTS as e } from "../../services/endpoints";

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
  search
}) => {
  try {
    const params = new URLSearchParams();
    if (is_active) params.append("is_active", is_active ? "true" : "false");
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (role) params.append("role", role.toString());
    if (search) params.append("search", search);

    const response = await Api.get(e.GET_USERS, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};
