export const ENDPOINTS = {
  LOGIN: "/auth/login/",

  INVITE_STATE: "/users/register-user/",

  // USERS
  SETUP_ACCOUNT: "/users/create-password/",
  GET_USERS: "/users/",

  // SETTINGS
  GET_REGIONS: "/settings/regions/",
  GET_SINGLE_REGION: (id) => `/settings/regions/${id}/`,
  GET_STATES: "/settings/states/",
  GET_ALL_HMO: "/settings/hmos/",
  GET_ALL_PROVIDERS: "/settings/providers/",

  // COMPLAINTS
  GET_COMPLAINTS: "/complaints/",
  GET_SINGLE_COMPLAINT: (id) => `/complaints/${id}`,
  GET_COMPLAINT_RESPONSES: (id) => `/complaints/${id}/responses/`,
  ADD_COMPLAINTS: "/complaints/",
  RESPOND_TO_COMPLAINTS: "/complaints/respond/"
};
