import { useState } from "react";
import OnboardingView from "./Onboarding";
import FirstForm from "../enrolees/ComplaintForm/FirstForm";
import SecondForm from "../enrolees/ComplaintForm/SecondForm";
import FormPreview from "../enrolees/ComplaintForm/FormPreview";
import { Box, Chip, Step, Stepper } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { addComplaint } from "../../services/general";
import { convertToBase64 } from "../../utils/convertTobase64";

const steps = [
  "Select State",
  "Personal Information",
  "Complaint Details",
  "Preview & Submit",
];

const Enrollee = () => {
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();
  const [step, setStep] = useState(1);
  const [stateInfo, setStateInfo] = useState(null);
  const [firstInfo, setFirstInfo] = useState({});
  const [complaintInfo, setComplaintInfo] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   const handleNext = () => setStep(step + 1);
  //   const handleBack = () => setStep(step - 1);
  const handleNext = () =>
    setStep((prevStep) => Math.min(prevStep + 1, steps.length));
  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 1));
  console.log(complaintInfo, "complaintInfo");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const evidences = await Promise.all(
        (complaintInfo.files || []).map(async (file) => {
          const base64 = await convertToBase64(file.raw);
          return { document: base64 };
        })
      );

      const data = {
        state: stateInfo,
        nhia_number: firstInfo.nhiaNo,
        firstname: firstInfo.firstName,
        lastname: firstInfo.lastName,
        middle_name: firstInfo.middleName,
        email: firstInfo.email,
        phone: firstInfo.phone,
        alternate_phone: firstInfo.altPhone || "",
        contact_address: firstInfo.contactAddress,
        complaint_against: firstInfo.complaint,
        incident_date: complaintInfo.date,
        incident_time: complaintInfo.time,
        nhia_programme: complaintInfo.programme,
        complaint_type: complaintInfo.complaint,
        description: complaintInfo.description,
        hmo: firstInfo.hmoId || "",
        provider: firstInfo.providerId || "",
        evidences,
      };

      const res = await addComplaint(data, true);
      handleSuccess(res.data?.message || "Complaint sent successfully");
      setStep(1);
      setStateInfo("");
      setFirstInfo({});
      setComplaintInfo({});
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
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
                  backgroundColor: "green",
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
            isSubmitting={isSubmitting}
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
