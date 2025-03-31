import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./views/auth/LoginPage";
import EmailVerification from "./components/EmailVerification";
import ForgotPassword from "./components/ForgotPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./shared/DashboardLayout";
import EnrolleeRoutes from "./views/enrolees/routes";
import HMORoutes from "./views/hmo/routes";
import StateRoutes from "./views/state/routes";
import ProviderRoutes from "./views/providers/routes";
import CentralRoutes from "./views/central/routes";
import OnboardingView from "./views/auth/Onboarding";
// import NotFound from "./components/NotFound";

const getUserRole = () => localStorage.getItem("userRole");

function App() {
  const userRole = getUserRole();

  return (
    <Routes>
      <Route path="/" element={<OnboardingView />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="enrollee/*" element={<EnrolleeRoutes />} />

      {/* Protect all dashboard routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardLayout role={userRole} />}>
          <Route path="hmo/*" element={<HMORoutes />} />
          <Route path="state/*" element={<StateRoutes />} />
          <Route path="provider/*" element={<ProviderRoutes />} />
          <Route path="central/*" element={<CentralRoutes />} />
        </Route>
      </Route>

      {/* Redirect if no role is found */}
      <Route
        path="/"
        element={
          userRole ? (
            <Navigate to={`/${userRole}/dashboard`} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* 404 Page */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
