import { Outlet, Route, Routes } from "react-router-dom";
import StateDashboard from "../dashboard/StateDashboard";
import StateComplaints from "../dashboard/StateComplaints";
import StateReports from "../dashboard/StateReport";
import InvitationsByState from "../dashboard/StateInvitaions";
import InvitationForm from "../dashboard/InvitationForm";
import StateProfile from "../dashboard/StateProfile";
// import StateSettings from "../dashboard/StateSettings";
import StateSingleComplaint from "../../../components/State/StateSingleComplaint";
import StateComplaintThread from "../../../components/State/StateComplaintThread";
import StateReplyComplaint from "../../../components/State/StateReplyComplaint";
import StateSettings from "../dashboard/StateSettings";

const StateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="dashboard" element={<StateDashboard />} />
        <Route path="complaints" element={<StateComplaints />} />
        <Route path="reports" element={<StateReports />} />

        {/* Nested invitations route */}
        <Route path="invitations" element={<Outlet />}>
          <Route index element={<InvitationsByState />} />
          <Route path="add-policy-user" element={<InvitationForm />} />
        </Route>

        <Route path="profile" element={<StateProfile />} />
        <Route path="settings" element={<StateSettings />} />
        <Route path="complaint/:id" element={<StateSingleComplaint />} />
        <Route path="complaint/:id/thread" element={<StateComplaintThread />} />
        <Route path="complaint/:id/reply" element={<StateReplyComplaint />} />
      </Route>
    </Routes>
  );
};

export default StateRoutes;
