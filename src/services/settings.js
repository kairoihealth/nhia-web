import Api from "../api/Api";
import { ENDPOINTS as e } from "../services/endpoints";

export const getRegions = async ({ ordering, page, pageSize, search }) => {
  try {
    const params = new URLSearchParams();
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (search) params.append("search", search);

    const response = await Api.get(e.GET_REGIONS, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch regions:", error);
    throw error;
  }
};

export const getSingleRegion = async (id) => {
  try {
    const response = await Api.get(e.GET_SINGLE_REGION(id));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch region:", error);
    throw error;
  }
};

export const getStatesByRegion = async ({
  ordering,
  page,
  pageSize,
  region,
  search,
}) => {
  try {
    const params = new URLSearchParams();
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (region) params.append("region", region.toString());
    if (search) params.append("search", search);

    const response = await Api.get(e.GET_STATES, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch states:", error);
    throw error;
  }
};
export const getStates = async () => {
  try {
    const response = await Api.get(e.GET_STATES);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch states:", error);
    throw error;
  }
};

export const getSingleState = async (id) => {
  try {
    const response = await Api.get(e.GET_SINGLE_STATE(id));
    return response.data;
  } catch (error) {
    console.error("Failed to fetch state:", error);
    throw error;
  }
};

export const getAllHmo = async ({ ordering, page, pageSize, search }) => {
  try {
    const params = new URLSearchParams();
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (search) params.append("search", search);

    const response = await Api.get(e.GET_ALL_HMO, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch hmos:", error);
    throw error;
  }
};

export const getAllProviders = async ({ ordering, page, pageSize, search }) => {
  try {
    const params = new URLSearchParams();
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (pageSize) params.append("page_size", pageSize.toString());
    if (search) params.append("search", search);

    const response = await Api.get(e.GET_ALL_PROVIDERS, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch providers:", error);
    throw error;
  }
};
