import { Outlet, Route, Routes } from "react-router-dom";
import CentralDashboard from "../dashboard/CentralDashboard";
import CentralAnalysis from "../dashboard/CentralAnalysis";
import RegionalStats from "../dashboard/RegionalStats";
import RegionStatesById from "../dashboard/RegionStatesById";
import RegStateInfo from "../dashboard/RegStateInfo";
import CentralComplaints from "../dashboard/CentralComplaints";
import CentralReports from "../dashboard/CentralReports";
import StateInviteByCentral from "../dashboard/StateInviteByCentral";
import StateInvitationForm from "../dashboard/StateInvitationForm";
import CentralProfile from "../dashboard/CentralProfile";
import CentralSettings from "../dashboard/CentralSettings";
import CentralSingleComplaint from "../../../components/Central/CentralSingleComplaint";
import CentralComplaintThread from "../../../components/Central/CentralComplaintThread";
import CentralReplyComplaint from "../../../components/Central/CentralReplyComplaint";

const CentralRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="dashboard" element={<CentralDashboard />} />
        <Route path="analysis" element={<CentralAnalysis />} />
        <Route path="regional-stats" element={<RegionalStats />} />
        <Route path="regional-stats/:slug" element={<RegionStatesById />} />
        <Route
          path="regional-stats/:slug/:stateId"
          element={<RegStateInfo />}
        />
        <Route path="complaints" element={<CentralComplaints />} />
        <Route path="reports" element={<CentralReports />} />
        <Route path="state/invite" element={<Outlet />}>
          <Route index element={<StateInviteByCentral />} />
          <Route path="add-user" element={<StateInvitationForm />} />
        </Route>
        <Route path="profile" element={<CentralProfile />} />
        <Route path="settings" element={<CentralSettings />} />
        <Route path="complaint/:id" element={<CentralSingleComplaint />} />
        <Route
          path="complaint/:id/thread"
          element={<CentralComplaintThread />}
        />
        <Route path="complaint/:id/reply" element={<CentralReplyComplaint />} />
      </Route>
    </Routes>
  );
};

export default CentralRoutes;
