import { Route, Routes } from "react-router-dom";
import FirstForm from "../ComplaintForm/FirstForm";
import SecondForm from "../ComplaintForm/SecondForm";
import FormPreview from "../ComplaintForm/FormPreview";
import ReviewForm from "../ComplaintReview/ReviewForm";

const EnrolleeRoutes = () => {
  return (
    <Routes>
      <Route path="complaint-first-form" element={<FirstForm />} />
      <Route path="complaint-second-form" element={<SecondForm />} />
      <Route path="form-preview" element={<FormPreview />} />
      <Route path="complaint-review" element={<ReviewForm />} />
    </Routes>
  );
};

export default EnrolleeRoutes;
