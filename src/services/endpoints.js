export const ENDPOINTS = {
  LOGIN: "/auth/login/",

  INVITE_STATE: "/users/register-user/",

  // USERS
  SETUP_ACCOUNT: "/users/create-password/",
  GET_USERS: "/users/",

  // STTINGS
  GET_REGIONS: "/settings/regions/",
  GET_SINGLE_REGION: (id) => `/settings/regions/${id}/`,
  GET_STATES: "/settings/states/",
  GET_ALL_HMO: "/settings/hmos/",
  GET_ALL_PROVIDERS: "/settings/providers/"
};
