import { Routes, Route, Outlet } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./custom.css";
import DashboardLayout from "../shared/DashboardLayout";
// import AccountType from "./views/auth/AccountType";
import EnroleesWelcomePage from "../views/enrolees/EnroleesWelcomePage";
import FirstForm from "../views/enrolees/ComplaintForm/FirstForm";
import SecondForm from "../views/enrolees/ComplaintForm/SecondForm";
import FormPreview from "../views/enrolees/ComplaintForm/FormPreview";
import ReviewForm from "../views/enrolees/ComplaintReview/ReviewForm";
// import HmoWelcomePage from "./views/hmo/auth/HmoWelcomePage";
// import HmoLoginPage from "./views/hmo/auth/HmoLoginPage";
// import HmoRegisterPage from "./views/hmo/auth/HmoRegisterPage";
// import HmoForgotPassword from "./components/ForgotPassword";
// import HmoResetPassword from "./views/hmo/auth/HmoResetPassword";
import HmoDashboard from "../views/hmo/dashboard/HmoDashboard";
import HmoComplaints from "../views/hmo/dashboard/HmoComplaints";
import HmoSingleComplaint from "../components/HMO/HmoSingleComplaint";
import HmoComplaintsThread from "../components/HMO/HmoComplaintsThread";
import HmoReports from "../views/hmo/dashboard/HmoReports";
import HmoProfile from "../views/hmo/dashboard/HmoProfile";
import HmoSettings from "../views/hmo/dashboard/HmoSettings";
// import ProvidersWelcomePage from "./views/providers/auth/ProvidersWelcomePage";
// import ProvidersLoginPage from "./views/providers/auth/ProvidersLoginPage";
// import ProvidersRegisterPage from "./views/providers/auth/ProvidersRegisterPage";
// import ProvidersForgotPassword from "./views/providers/auth/ProvidersForgotPassword";
// import ProvidersResetPassword from "./views/providers/auth/ProvidersResetPassword";
import EmailVerification from "../components/EmailVerification";
import ProviderDashboard from "../views/providers/dashboard/ProviderDashboard";
import ProviderComplaints from "../views/providers/dashboard/ProvidersComplaints";
import ProvidersReport from "../views/providers/dashboard/ProvidersReport";
import ProvidersProfile from "../views/providers/dashboard/ProvidersProfile";
import ProvidersSettings from "../views/providers/dashboard/ProvidersSettings";
// import StateWelcomePage from "./views/state/auth/StateWelcomePage";
// import StateRegisterPage from "./views/state/auth/StateRegisterPage";
// import StateLoginPage from "./views/state/auth/StateLoginPage";
import StateDashboard from "../views/state/dashboard/StateDashboard";
import StateComplaints from "../views/state/dashboard/StateComplaints";
import StateReports from "../views/state/dashboard/StateReport";
import StateProfile from "../views/state/dashboard/StateProfile";
import StateSettings from "../views/state/dashboard/StateSettings";
import HmoReplyComplaints from "../components/HMO/HmoReplyComplaints";
import ProvidersSingleComplaint from "../components/Providers/ProvidersSingleComplaint";
import ProvidersComplaintThread from "../components/Providers/ProvidersComplaintThread";
import ProvidersReplyComplaint from "../components/Providers/ProvidersReplyComplaint";
import StateSingleComplaint from "../components/State/StateSingleComplaint";
import StateComplaintThread from "../components/State/StateComplaintThread";
import StateReplyComplaint from "../components/State/StateReplyComplaint";
import CentralDashboard from "../views/central/dashboard/CentralDashboard";
import CentralComplaints from "../views/central/dashboard/CentralComplaints";
import CentralProfile from "../views/central/dashboard/CentralProfile";
import CentralReports from "../views/central/dashboard/CentralReports";
import CentralSettings from "../views/central/dashboard/CentralSettings";
import CentralSingleComplaint from "../components/Central/CentralSingleComplaint";
import ForgotPassword from "../components/ForgotPassword";
import CentralAnalysis from "../views/central/dashboard/CentralAnalysis";
import RegionalStats from "../views/central/dashboard/RegionalStats";
import RegionStatesById from "../views/central/dashboard/RegionStatesById";
import OnboardingView from "../views/auth/Onboarding";
import LoginPage from "../views/auth/LoginPage";
import StateInviteByCentral from "../views/central/dashboard/StateInviteByCentral";
import StateInvitationForm from "../views/central/dashboard/StateInvitationForm";
import InvitationsByState from "../views/state/dashboard/StateInvitaions";
import InvitationForm from "../views/state/dashboard/InvitationForm";
import RegStateInfo from "../views/central/dashboard/RegStateInfo";

function OldApp() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<AccountType />} /> */}
        <Route path="/" element={<OnboardingView />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/******************Enrollee****************/}
        <Route
          path="/enrollees-welcome-page"
          element={<EnroleesWelcomePage />}
        />
        <Route path="/enrollee-complaint-first-form" element={<FirstForm />} />
        <Route
          path="/enrollee-complaint-second-form"
          element={<SecondForm />}
        />
        <Route path="/enrollee-form-preview" element={<FormPreview />} />
        <Route path="/enrollee-complaint-review" element={<ReviewForm />} />

        {/*******************HMO*****************/}
        {/* <Route path="/hmo-welcome-page" element={<HmoWelcomePage />} />
        <Route path="/hmo-login-page" element={<HmoLoginPage />} /> */}
        {/* <Route path="/hmo-register-page" element={<HmoRegisterPage />} /> */}
        {/* <Route path="/hmo-reset-password" element={<HmoResetPassword />} /> */}
        <Route
          path="/hmo-dashboard/*"
          element={
            <DashboardLayout role="hmo">
              <HmoDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/hmo-complaints"
          element={
            <DashboardLayout role="hmo">
              <HmoComplaints />
            </DashboardLayout>
          }
        />
        <Route
          path="/hmo-reports"
          element={
            <DashboardLayout role="hmo">
              <HmoReports />
            </DashboardLayout>
          }
        />
        <Route
          path="/hmo-profile"
          element={
            <DashboardLayout role="hmo">
              <HmoProfile />
            </DashboardLayout>
          }
        />
        <Route
          path="/hmo-settings"
          element={
            <DashboardLayout role="hmo">
              <HmoSettings />
            </DashboardLayout>
          }
        />
        <Route
          path="/hmo-complaint/:id"
          element={
            <DashboardLayout role="hmo">
              <HmoSingleComplaint />
            </DashboardLayout>
          }
        />
        <Route
          path="/hmo-complaint/:id/thread"
          element={
            <DashboardLayout role="hmo">
              <HmoComplaintsThread />
            </DashboardLayout>
          }
        />
        <Route
          path="/hmo-complaint/:id/reply"
          element={
            <DashboardLayout role="hmo">
              <HmoReplyComplaints />
            </DashboardLayout>
          }
        />

        {/*****************Providers********************/}
        {/* <Route
          path="/providers-welcome-page"
          element={<ProvidersWelcomePage />}
        />
        <Route path="/providers-login-page" element={<ProvidersLoginPage />} />
        <Route
          path="/providers-register-page"
          element={<ProvidersRegisterPage />}
        /> */}
        {/* <Route
          path="/providers-forgot-password"
          element={<ProvidersForgotPassword />}
        /> */}
        {/* <Route
          path="/providers-reset-password"
          element={<ProvidersResetPassword />}
        /> */}
        <Route
          path="/providers-dashboard"
          element={
            <DashboardLayout role="provider">
              <ProviderDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/providers-complaints"
          element={
            <DashboardLayout role="provider">
              <ProviderComplaints />
            </DashboardLayout>
          }
        />
        <Route
          path="/providers-reports"
          element={
            <DashboardLayout role="provider">
              <ProvidersReport />
            </DashboardLayout>
          }
        />
        <Route
          path="/providers-profile"
          element={
            <DashboardLayout role="provider">
              <ProvidersProfile />
            </DashboardLayout>
          }
        />
        <Route
          path="/providers-settings"
          element={
            <DashboardLayout role="provider">
              <ProvidersSettings />
            </DashboardLayout>
          }
        />
        <Route
          path="/provider-complaint/:id"
          element={
            <DashboardLayout role="provider">
              <ProvidersSingleComplaint />
            </DashboardLayout>
          }
        />
        <Route
          path="/provider-complaint/:id/thread"
          element={
            <DashboardLayout role="provider">
              <ProvidersComplaintThread />
            </DashboardLayout>
          }
        />
        <Route
          path="/provider-complaint/:id/reply"
          element={
            <DashboardLayout role="provider">
              <ProvidersReplyComplaint />
            </DashboardLayout>
          }
        />

        {/*********************State********************/}
        {/* <Route path="/state-welcome-page" element={<StateWelcomePage />} />
        <Route path="/state-login-page" element={<StateLoginPage />} />
        <Route path="/state-register-page" element={<StateRegisterPage />} /> */}
        <Route
          path="/state-dashboard"
          element={
            <DashboardLayout role="state">
              <StateDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/state-complaints"
          element={
            <DashboardLayout role="state">
              <StateComplaints />
            </DashboardLayout>
          }
        />
        <Route
          path="/state-reports"
          element={
            <DashboardLayout role="state">
              <StateReports />
            </DashboardLayout>
          }
        />
        <Route
          path="/state-invitations"
          element={
            <DashboardLayout role="state">
              <Outlet />
            </DashboardLayout>
          }
        >
          <Route index element={<InvitationsByState />} />
          <Route path="add-policy-user" element={<InvitationForm />} />
        </Route>
        <Route
          path="/state-profile"
          element={
            <DashboardLayout role="state">
              <StateProfile />
            </DashboardLayout>
          }
        />
        <Route
          path="/state-settings"
          element={
            <DashboardLayout role="state">
              <StateSettings />
            </DashboardLayout>
          }
        />
        <Route
          path="/state-complaint/:id"
          element={
            <DashboardLayout role="state">
              <StateSingleComplaint />
            </DashboardLayout>
          }
        />
        <Route
          path="/state-complaint/:id/thread"
          element={
            <DashboardLayout role="state">
              <StateComplaintThread />
            </DashboardLayout>
          }
        />
        <Route
          path="/state-complaint/:id/reply"
          element={
            <DashboardLayout role="state">
              <StateReplyComplaint />
            </DashboardLayout>
          }
        />

        {/*********************Central********************/}
        <Route
          path="/central-dashboard"
          element={
            <DashboardLayout role="central">
              <CentralDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/central-analysis"
          element={
            <DashboardLayout role="central">
              <CentralAnalysis />
            </DashboardLayout>
          }
        />
        <Route
          path="/central-regional-stats"
          element={
            <DashboardLayout role="central">
              <RegionalStats />
            </DashboardLayout>
          }
        />
        <Route
          path="/central-regional-stats/:slug"
          element={
            <DashboardLayout role="central">
              <RegionStatesById />
            </DashboardLayout>
          }
        />
        <Route
          path="/central-regional-stats/:slug/:stateId"
          element={
            <DashboardLayout role="central">
              <RegStateInfo />
            </DashboardLayout>
          }
        />
        <Route
          path="/central-complaints"
          element={
            <DashboardLayout role="central">
              <CentralComplaints />
            </DashboardLayout>
          }
        />
        <Route
          path="/central-reports"
          element={
            <DashboardLayout role="central">
              <CentralReports />
            </DashboardLayout>
          }
        />
        <Route
          path="/central-state-invite"
          element={
            <DashboardLayout role="central">
              <Outlet />
            </DashboardLayout>
          }
        >
          <Route index element={<StateInviteByCentral />} />
          <Route path="add-user" element={<StateInvitationForm />} />
        </Route>
        <Route
          path="/central-profile"
          element={
            <DashboardLayout role="central">
              <CentralProfile />
            </DashboardLayout>
          }
        />
        <Route
          path="/central-settings"
          element={
            <DashboardLayout role="central">
              <CentralSettings />
            </DashboardLayout>
          }
        />
        <Route
          path="/central-complaint/:id"
          element={
            <DashboardLayout role="central">
              <CentralSingleComplaint />
            </DashboardLayout>
          }
        />
      </Routes>
    </>
  );
}

export default OldApp;
