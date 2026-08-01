import { useState } from "react";
import FirstForm from "../enrolees/ComplaintForm/FirstForm";
import SecondForm from "../enrolees/ComplaintForm/SecondForm";
import FormPreview from "../enrolees/ComplaintForm/FormPreview";
import ComplainantTypeSelection from "../enrolees/ComplaintForm/ComplainantTypeSelection";
import StateSelection from "../enrolees/ComplaintForm/StateSelection";
import { Box, Chip, Step, Stepper } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useHandleError, useHandleSuccess } from "../../hooks/useToastHandler";
import { addComplaint } from "../../services/general";
import { convertToBase64 } from "../../utils/convertTobase64";
import { useNavigate } from "react-router-dom";

const steps = [
  "Complainant Type",
  "Incident State",
  "Personal Information",
  "Complaint Details",
  "Preview & Submit",
];

const Enrollee = () => {
  const navigate = useNavigate();
  const handleSuccess = useHandleSuccess();
  const handleError = useHandleError();
  const [step, setStep] = useState(1);
  const [stateInfo, setStateInfo] = useState(null);
  const [selectedComplainantType, setSelectedComplainantType] = useState("");
  const [firstInfo, setFirstInfo] = useState({});
  const [complaintInfo, setComplaintInfo] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //   const handleNext = () => setStep(step + 1);
  //   const handleBack = () => setStep(step - 1);
  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 5));
  const handleBack = () => {
    if (step === 1) {
      navigate(-1); // Go to the previous page in browser history (e.g., Home page)
    } else {
      setStep((prevStep) => Math.max(prevStep - 1, 1));
    }
  };
  console.log(complaintInfo, "complaintInfo");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const evidences = await Promise.all(
        (complaintInfo.files || []).map(async (file) => {
          const base64 = await convertToBase64(file.raw);
          return { document: base64 };
        }),
      );

      let finalDescription =
        complaintInfo.otherDescription || complaintInfo.description;
      if (
        complaintInfo.description !== "Others" &&
        complaintInfo.additional_information
      ) {
        finalDescription += `\n\nAdditional Information:\n${complaintInfo.additional_information}`;
      }

      const data = {
        complainant_category: selectedComplainantType,
        state: stateInfo,
        nhia_number: firstInfo.nhiaNo,
        firstname: firstInfo.firstName,
        lastname: firstInfo.lastName,
        middle_name: firstInfo.middleName,
        email: firstInfo.email,
        phone: firstInfo.phone,
        alternate_phone: firstInfo.altPhone || "",
        contact_address: firstInfo.contactAddress,
        complaint_against: firstInfo.complaint_against,
        incident_date: complaintInfo.date,
        incident_time: complaintInfo.time,
        nhia_programme: complaintInfo.programme,
        complaint_type: complaintInfo.complaint_type,
        complaint_category: complaintInfo.complaint_category,
        enrolleeNo: complaintInfo.enrolleeNo,
        description: finalDescription,
        priority: complaintInfo.priority?.toLowerCase() || "medium",
        hmo: firstInfo.hmoId || "",
        provider: firstInfo.providerId || "",
        organization: firstInfo.organization || "",
        evidences,
      };

      const res = await addComplaint(data, true);
      handleSuccess(res.data?.message || "Complaint sent successfully");
      // setStep(1);
      navigate("/enrollee-submission-status", { replace: true });
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
          <ComplainantTypeSelection
            selectedAccountType={selectedComplainantType}
            setSelectedAccountType={setSelectedComplainantType}
            onNext={handleNext}
            onBack={handleBack}
            btn={<StepButton />}
          />
        );
      case 2:
        return (
          <StateSelection
            stateInfo={stateInfo}
            setStateInfo={setStateInfo}
            onNext={handleNext}
            onBack={handleBack}
            btn={<StepButton />}
          />
        );
      case 3:
        return (
          // This will now be step 3
          <FirstForm
            firstInfo={firstInfo}
            setFirstInfo={setFirstInfo}
            onNext={handleNext}
            onBack={handleBack}
            btn={<StepButton />}
            selectedAccountType={selectedComplainantType}
          />
        );
      case 4: // This will now be step 4
        return (
          <SecondForm
            complaintInfo={complaintInfo}
            setComplaintInfo={setComplaintInfo}
            firstInfo={firstInfo}
            onNext={handleNext}
            onBack={handleBack}
            btn={<StepButton />}
          />
        );
      case 5: // This will now be step 5
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
