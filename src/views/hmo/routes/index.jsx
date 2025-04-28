import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/HmoDashboard";
import HmoComplaints from "../dashboard/HmoComplaints";
import HmoReports from "../dashboard/HmoReports";
import HmoProfile from "../dashboard/HmoProfile";
// import HmoSettings from "../dashboard/HmoSettings";
import HmoSingleComplaint from "../../../components/HMO/HmoSingleComplaint";
import HmoComplaintsThread from "../../../components/HMO/HmoComplaintsThread";
import HmoReplyComplaints from "../../../components/HMO/HmoReplyComplaints";

const HMORoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="complaints" element={<HmoComplaints />} />
      <Route path="reports" element={<HmoReports />} />
      <Route path="profile" element={<HmoProfile />} />
      {/* <Route path="settings" element={<HmoSettings />} /> */}
      <Route path="complaint/:id" element={<HmoSingleComplaint />} />
      <Route path="complaint/:id/thread" element={<HmoComplaintsThread />} />
      <Route path="complaint/:id/reply" element={<HmoReplyComplaints />} />
    </Routes>
  );
};

export default HMORoutes;
