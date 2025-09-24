import { Routes, Route } from "react-router-dom";
import LoginPage from "./views/auth/LoginPage";
import AccountSetup from "./views/auth/AccountSetup";
import EmailVerification from "./components/EmailVerification";
import ForgotPassword from "./components/ForgotPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./shared/DashboardLayout";
// import EnrolleeRoutes from "./views/enrolees/routes";
import HMORoutes from "./views/hmo/routes";
import StateRoutes from "./views/state/routes";
import ProviderRoutes from "./views/providers/routes";
import CentralRoutes from "./views/central/routes";
// import OnboardingView from "./views/auth/Onboarding";
// import FirstForm from "./views/enrolees/ComplaintForm/FirstForm";
// import SecondForm from "./views/enrolees/ComplaintForm/SecondForm";
// import FormPreview from "./views/enrolees/ComplaintForm/FormPreview";
// import ReviewForm from "./views/enrolees/ComplaintReview/ReviewForm";
import ErrorPage from "./shared/ErrorPage";
import Enrollee from "./views/auth/Enrollee";
import HmoRegisterPage from "./views/hmo/auth/HmoRegisterPage";
// import NotFound from "./components/NotFound";

const getUserRole = () => localStorage.getItem("userRole");
const getUsername = () => localStorage.getItem("fullname");

function App() {
  const userRole = getUserRole();
  const fullname = getUsername();

  return (
    <Routes>
      <Route path="/" element={<Enrollee />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account-setup" element={<AccountSetup />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/*Enrollee routes*/}
      {/* <Route path="enrollee/*" element={<EnrolleeRoutes />} /> */}
      {/* <Route path="/enrollee-complaint-first-form" element={<FirstForm />} />
      <Route path="/enrollee-complaint-second-form" element={<SecondForm />} />
      <Route path="/enrollee-form-preview" element={<FormPreview />} />
      <Route path="/enrollee-complaint-review" element={<ReviewForm />} /> */}

      <Route path="hmo-register" element={<HmoRegisterPage />} />
      {/* Protect all dashboard routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<DashboardLayout username={fullname} role={userRole} />}
        >
          <Route path="hmo/*" element={<HMORoutes />} />
          <Route path="stateadmin/*" element={<StateRoutes />} />
          <Route path="provider/*" element={<ProviderRoutes />} />
          <Route path="admin/*" element={<CentralRoutes />} />
        </Route>
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
