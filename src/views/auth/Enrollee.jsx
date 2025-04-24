import { useState } from "react";
import OnboardingView from "./Onboarding";
import FirstForm from "../enrolees/ComplaintForm/FirstForm";
import SecondForm from "../enrolees/ComplaintForm/SecondForm";
import FormPreview from "../enrolees/ComplaintForm/FormPreview";
import { Box, Chip, Step, Stepper } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useHandleError } from "../../hooks/useToastHandler";
import { addComplaint } from "../../services/general";

const steps = [
  "Select State",
  "Personal Information",
  "Complaint Details",
  "Preview & Submit"
];

const Enrollee = () => {
  const handleError = useHandleError();
  const [step, setStep] = useState(1);
  const [stateInfo, setStateInfo] = useState(null);
  const [firstInfo, setFirstInfo] = useState({});
  const [complaintInfo, setComplaintInfo] = useState({});

  //   const handleNext = () => setStep(step + 1);
  //   const handleBack = () => setStep(step - 1);
  const handleNext = () =>
    setStep((prevStep) => Math.min(prevStep + 1, steps.length));
  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("state", stateInfo);
      formData.append("nhia_number", firstInfo.nhiaNo);
      formData.append("firstname", firstInfo.firstName);
      formData.append("lastname", firstInfo.lastName);
      formData.append("middle_name", firstInfo.middleName);
      formData.append("email", firstInfo.email);
      formData.append("phone", firstInfo.phone);
      formData.append("alternate_phone", firstInfo.altPhone || "");
      formData.append("contact_address", firstInfo.contactAddress);
      formData.append("complaint_against", firstInfo.complaint);
      formData.append("incident_date", complaintInfo.date);
      formData.append("incident_time", complaintInfo.time);
      formData.append("nhia_programme", complaintInfo.programme);
      formData.append("complaint_type", complaintInfo.complaint);
      formData.append("description", complaintInfo.description);
      formData.append("hmo", firstInfo.hmoId || "");
      formData.append("provider", firstInfo.providerId || "");

      (complaintInfo.files || []).forEach((fileObj, index) => {
        if (fileObj && fileObj.raw instanceof File) {
          formData.append(`evidences[${index}][document]`, fileObj.raw);
        } else {
          console.warn(`File at index ${index} is invalid:`, fileObj);
        }
      });

      await addComplaint(formData, true);
      setStateInfo("");
      setFirstInfo({});
      setComplaintInfo({});
    } catch (error) {
      handleError("Failed to submit complaint:", error);
    }
  };

  const StepButton = () => {
    return (
      <Stepper
        activeStep={step - 1}
        alternativeLabel
        sx={{ justifyContent: "flex-end", mt: 2 }}
        connector={null}
      >
        {steps.map((_, index) => (
          <Step key={index}>
            {step - 1 === index ? (
              <Chip
                sx={{
                  width: "100%",
                  height: "12px",
                  backgroundColor: "green"
                }}
              />
            ) : (
              <CircleIcon
                sx={{ width: "50px", height: "12px", color: "grey" }}
              />
            )}
          </Step>
        ))}
      </Stepper>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingView
            stateInfo={stateInfo}
            setStateInfo={setStateInfo}
            onNext={handleNext}
            btn={<StepButton />}
          />
        );
      case 2:
        return (
          <FirstForm
            firstInfo={firstInfo}
            setFirstInfo={setFirstInfo}
            onNext={handleNext}
            onBack={handleBack}
            btn={<StepButton />}
          />
        );
      case 3:
        return (
          <SecondForm
            complaintInfo={complaintInfo}
            setComplaintInfo={setComplaintInfo}
            onNext={handleNext}
            onBack={handleBack}
            btn={<StepButton />}
          />
        );
      case 4:
        return (
          <FormPreview
            firstInfo={firstInfo}
            complaintInfo={complaintInfo}
            onSubmit={handleSubmit}
            onBack={handleBack}
            btn={<StepButton />}
          />
        );

      default:
        return null;
    }
  };

  return <Box sx={{ width: "100%" }}>{renderStep()}</Box>;
};

export default Enrollee;
