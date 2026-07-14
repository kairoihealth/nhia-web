import { Route, Routes } from "react-router-dom";
// import FirstForm from "../ComplaintForm/FirstForm";
// import SecondForm from "../ComplaintForm/SecondForm";
// import FormPreview from "../ComplaintForm/FormPreview";
import EnrolleeDashboard from "../dashboard/EnrolleeDashboard";
import EnrolleeComplaints from "../dashboard/EnrolleeComplaints";
import EnrolleeProfile from "../dashboard/EnrolleeProfile";
import CreateComplaint from "../dashboard/CreateComplaint";
import EnrolleeSingleComplaint from "../../../components/Enrollee/EnrolleeSingleComplaint";
import EnrolleeComplaintThread from "../../../components/Enrollee/EnrolleeComplaintThread";
import EnrolleeReplyComplaint from "../../../components/Enrollee/EnrolleeReplyComplaint";

const EnrolleeRoutes = () => {
  return (
    <Routes>
      {/* <Route path="complaint-first-form" element={<FirstForm />} />
      <Route path="complaint-second-form" element={<SecondForm />} />
      <Route path="form-preview" element={<FormPreview />} /> */}
      <Route path="dashboard" element={<EnrolleeDashboard />} />
      <Route path="complaints" element={<EnrolleeComplaints />} />
      <Route path="complaint/create" element={<CreateComplaint />} />
      <Route path="profile" element={<EnrolleeProfile />} />
      <Route path="complaint/:id" element={<EnrolleeSingleComplaint />} />
      <Route
        path="complaint/:id/thread"
        element={<EnrolleeComplaintThread />}
      />
      <Route path="complaint/:id/reply" element={<EnrolleeReplyComplaint />} />
    </Routes>
  );
};

export default EnrolleeRoutes;
