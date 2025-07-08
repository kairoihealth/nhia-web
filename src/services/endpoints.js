export const ENDPOINTS = {
  LOGIN: "/auth/login/",

  INVITE_STATE: "/users/register-user/",

  // USERS
  SETUP_ACCOUNT: "/users/create-password/",
  GET_USERS: "/users/",
  GET_SINGLE_USER: (id) => `/users/${id}/`,

  // SETTINGS
  GET_REGIONS: "/settings/regions/",
  GET_SINGLE_REGION: (id) => `/settings/regions/${id}/`,
  GET_STATES: "/settings/states/",
  GET_ALL_HMO: "/settings/hmos/",
  GET_ALL_PROVIDERS: "/settings/providers/",

  // COMPLAINTS
  GET_COMPLAINTS: "/complaints/",
  GET_COMPLAINT_SATISFACTION_SCORES: "/complaints/satisfaction-score/",
  GET_COMPLAINT_STATS: "/complaints/stats/",
  GET_COMPLAINT_TRENDS: "/complaints/trends/",
  GET_COMPLAINT_TRENDS_BY_ORG: "/complaints/trends-by-organisation/",
  GET_SINGLE_COMPLAINT: (id) => `/complaints/${id}/`,
  GET_COMPLAINT_RESPONSES: (id) => `/complaints/${id}/responses/`,
  ADD_COMPLAINTS: "/complaints/",
  RESPOND_TO_COMPLAINTS: "/complaints/respond/",
};
