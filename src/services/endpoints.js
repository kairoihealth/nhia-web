export const ENDPOINTS = {
  LOGIN: "/auth/login/",

  INVITE_USER: "/users/register-user/",

  // USERS
  SETUP_ACCOUNT: "/users/create-password/",
  UPDATE_PROFILE: (id) => `/users/${id}/update-profile/`,
  CHANGE_PASSWORD: "/users/change-password/",
  FORGOT_PASSWORD: "/users/reset-password/",
  RESET_PASSWORD: "/users/reset-password-confirm/",
  GET_USERS: "/users/",
  CREATE_USER: "/users/",
  ENROLLEE_SIGNUP: "/users/register-enrollee/",
  GET_SINGLE_USER: (id) => `/users/${id}/`,
  ADD_USER: "/users/register-user/",
  UPDATE_USER: (id) => `/users/${id}/`,
  UPDATE_ADMIN: (id) => `/users/${id}/admin-update/`,
  GET_ADMINS: "/users/admins/",

  // ADMIN STATUSES
  GET_ADMIN_STATUSES: "/admin-statuses/",
  UPDATE_ADMIN_STATUS: (id) => `/admin-statuses/${id}/`,
  ADD_ADMIN_STATUS: "/admin-statuses/",
  DELETE_ADMIN_STATUS: (id) => `/admin-statuses/${id}/`,
  GET_SINGLE_ADMIN_STATUS: (id) => `/admin-statuses/${id}/`,
  GET_ADMIN_STATUS_USERS: (id) => `/admin-statuses/${id}/users/`,

  // SETTINGS
  GET_REGIONS: "/settings/regions/",
  GET_SINGLE_REGION: (id) => `/settings/regions/${id}/`,
  GET_STATES: "/settings/states/",
  GET_SINGLE_STATE: (id) => `/settings/states/${id}/`,
  GET_ALL_HMO: "/settings/hmos/",
  GET_ALL_PROVIDERS: "/settings/providers/",
  ADD_HMO: "/settings/hmos/manual/",
  ADD_PROVIDER: "/settings/providers/manual/",
  BULK_UPLOAD_HMO: "/settings/hmos/bulk-upload/",
  BULK_UPLOAD_PROVIDER: "/settings/providers/bulk-upload/",
  UPDATE_HMO: (id) => `/settings/hmos/${id}/`,
  UPDATE_PROVIDER: (id) => `/settings/providers/${id}/`,
  GET_SINGLE_HMO: (id) => `/settings/hmos/${id}/`,
  GET_SINGLE_PROVIDER: (id) => `/settings/providers/${id}/`,
  ADD_STATE: "/settings/states/",
  UPDATE_STATE: (id) => `/settings/states/${id}/`,

  // COMPLAINTS
  GET_COMPLAINTS: "/complaints/",
  GET_COMPLAINT_SATISFACTION_SCORES: "/complaints/satisfaction-score/",
  GET_COMPLAINT_STATS: "/complaints/stats/",
  GET_COMPLAINT_TRENDS: "/complaints/trends/",
  GET_COMPLAINT_TRENDS_BY_ORG: "/complaints/trends-by-organisation/",
  GET_SINGLE_COMPLAINT: (id) => `/complaints/${id}/`,
  GET_COMPLAINT_RESPONSES: (id) => `/complaints/${id}/responses/`,
  GET_SINGLE_COMPLAINT_BY_CASE_ID: (case_id) => `/complaints/case/${case_id}/`,
  GET_COMPLAINT_RESPONSES_BY_CASE_ID: (case_id) =>
    `/complaints/case/${case_id}/responses/`,
  ADD_COMPLAINTS: "/complaints/",
  GET_COMPLAINT_ISSUE_OPTIONS: "/complaints/issue-options/",
  UPDATE_COMPLAINT_STATUS: (id) => `/complaints/${id}/status-with-history/`,
  RATE_COMPLAINT: (id) => `/complaints/${id}/rate/`,
  ASSIGN_COMPLAINT: (id) => `/complaints/${id}/assign/`,
  UPDATE_COMPLAINT_PRIORITY: (id) => `/complaints/${id}/update-priority/`,
  RESPOND_TO_COMPLAINTS: "/complaints/respond/",
  GET_WORKLOAD_SUMMARY: "/complaints/workload-summary/",
  GET_COMPLAINT_STATUS_HISTORY: (id) => `/complaints/${id}/status-history/`,
  GET_COMPLAINT_ASSIGNMENT_HISTORY: (id) =>
    `/complaints/${id}/assignment-history/`,

  //INVITATIONS
  SEND_INVITATION: "/invitations/",
  GET_INVITATIONS: "/invitations/",
  ACCEPT_INVITATION: `/invitations/accept/`,
  GET_SINGLE_INVITATION: (id) => `/invitations/${id}/`,
  RESEND_INVITATION: (id) => `/invitations/${id}/resend/`,
  CANCEL_INVITATION: (id) => `/invitations/${id}/cancel/`,
  VERIFY_INVITATION: `/invitations/verify/`,

  //NOTIFICATIONS
  GET_NOTIFICATIONS: "/notifications/",
  GET_UNREAD_NOTIFICATIONS: "/notifications/unread/",
  GET_UNREAD_NOTIFICATIONS_COUNT: "/notifications/unread-count/",
  GET_SINGLE_NOTIFICATION: (id) => `/notifications/${id}/`,
  MARK_NOTIFICATION_AS_READ: (id) => `/notifications/${id}/mark-as-read/`,
  MARK_ALL_NOTIFICATIONS_AS_READ: "/notifications/mark-all-as-read/",
};
