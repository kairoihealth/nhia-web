import { Route, Routes } from "react-router-dom";
import ProviderDashboard from "../dashboard/ProviderDashboard";
import ProviderComplaints from "../dashboard/ProvidersComplaints";
import ProvidersReport from "../dashboard/ProvidersReport";
import ProvidersProfile from "../dashboard/ProvidersProfile";
import ProvidersSettings from "../dashboard/ProvidersSettings";
import ProvidersSingleComplaint from "../../../components/Providers/ProvidersSingleComplaint";
import ProvidersComplaintThread from "../../../components/Providers/ProvidersComplaintThread";
import ProvidersReplyComplaint from "../../../components/Providers/ProvidersReplyComplaint";
const ProviderRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<ProviderDashboard />} />
      <Route path="complaints" element={<ProviderComplaints />} />
      <Route path="reports" element={<ProvidersReport />} />
      <Route path="profile" element={<ProvidersProfile />} />
      <Route path="settings" element={<ProvidersSettings />} />
      <Route path="complaint/:id" element={<ProvidersSingleComplaint />} />
      <Route
        path="complaint/:id/thread"
        element={<ProvidersComplaintThread />}
      />
      <Route path="complaint/:id/reply" element={<ProvidersReplyComplaint />} />
    </Routes>
  );
};

export default ProviderRoutes;
