/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  TextField,
  Button,
  FormControl,
  Typography,
  Card,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PropTypes from "prop-types";
import ReactSelect from "react-select";
import {
  formControlStyles,
  selectStyles,
  textFieldStyles,
} from "../../../utils/style";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSingleHmo, getSingleProvider } from "../../../services/settings";
import StakeholderSelect from "../../../shared/StakeholderSelect";
import TwoColumnLayout from "./TwoColumnLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormCardHeader from "./FormCardHeader";
import useAuth from "../../../hooks/useAuth";
import { useAllowedRespondents } from "../../../hooks/useComplaintIssues";

// Complainants who file from inside the portal rather than from the public
// form: their organisation and their identity come from the signed-in account.
const PORTAL_COMPLAINANTS = ["HMO", "Provider"];

const FirstForm = ({
  firstInfo,
  setFirstInfo,
  onNext,
  onBack,
  selectedAccountType,
}) => {
  const [errors, setErrors] = useState({});
  const [selectedHmo, setSelectedHmo] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedHmoOrProviderName, setSelectedHmoOrProviderName] =
    useState(null);

  const { user, isLoggedIn } = useAuth();
  const filesFromPortal = PORTAL_COMPLAINANTS.includes(selectedAccountType);

  // Who a complainant may file against depends on their own category — an
  // enrollee cannot complain about another enrollee, an HMO cannot complain
  // about another HMO.
  const { respondentOptions } = useAllowedRespondents(selectedAccountType);

  // An HMO or HCF complainant is identified by the account they signed in
  // with, so their organisation is read off that account rather than picked
  // from a dropdown they could get wrong.
  const signedInOrganizationId =
    selectedAccountType === "HMO"
      ? localStorage.getItem("hmoId")
      : selectedAccountType === "Provider"
        ? localStorage.getItem("providerId")
        : null;

  // The organisation the signed-in user belongs to, fetched by id rather than
  // pulled out of a full list — the facility register has ~17,000 rows.
  const { data: signedInOrganizationRecord } = useQuery({
    queryKey: [
      "signed-in-organization",
      selectedAccountType,
      signedInOrganizationId,
    ],
    queryFn: () =>
      selectedAccountType === "HMO"
        ? getSingleHmo(signedInOrganizationId)
        : getSingleProvider(signedInOrganizationId),
    enabled: filesFromPortal && Boolean(signedInOrganizationId),
  });

  const signedInOrganization = useMemo(
    () =>
      signedInOrganizationRecord
        ? {
            value: signedInOrganizationRecord.id,
            label: signedInOrganizationRecord.name,
          }
        : null,
    [signedInOrganizationRecord],
  );

  const signedInName = [user?.name, user?.firstname, user?.lastname]
    .filter((part) => part && part !== "None")
    .join(" ")
    .trim();

  useEffect(() => {
    if (!filesFromPortal || !user) {
      if (selectedAccountType === "Whistleblower") {
        setFirstInfo((prev) => ({
          ...prev,
          isAnonymous: "false",
        }));
      } else {
        delete firstInfo.isAnonymous;
      }
      return;
    }
    // Contact details default to the signed-in account; the complaint is
    // logged by a person but filed on behalf of their organisation.
    setFirstInfo((prev) => ({
      ...prev,
      email: prev.email || user.email || "",
      phone: prev.phone || user.phone || "",
      organization: signedInOrganization?.label || prev.organization || "",
      complainant_organization_id:
        signedInOrganizationId || prev.complainant_organization_id || "",
      // Shown on the preview so the person filing can see what will be
      // recorded against their name; the API reads it from the token, not this.
      loggedBy: signedInName || user.email || "",
    }));
  }, [
    filesFromPortal,
    user,
    signedInName,
    signedInOrganization,
    signedInOrganizationId,
    setFirstInfo,
    selectedAccountType,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value, checked, "checked");
    let identity;
    if (name === "isAnonymous" && value === "true") {
      identity = {
        firstName: null,
        lastName: null,
      };
      // setFirstInfo({ ...firstInfo, firstName: "", lastName: "" });
    }
    setFirstInfo({ ...firstInfo, ...identity, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFirstInfo({ ...firstInfo, phone: value });
  };

  const handleAltPhoneChange = (value) => {
    setFirstInfo({ ...firstInfo, altPhone: value });
  };

  const handleComplaintChange = (selectedOption) => {
    const value = selectedOption?.value || "";

    setFirstInfo((prev) => ({
      ...prev,
      complaint_against: value,
    }));

    // Clear dependent selections
    setSelectedHmo(null);
    setSelectedProvider(null);
  };

  // const handleIsAnonymousChange =

  const handleHmoChange = (selectedOption) => {
    setSelectedHmo(selectedOption);
    setSelectedHmoOrProviderName(selectedOption?.label || null);
  };

  const handleProviderChange = (selectedOption) => {
    setSelectedProvider(selectedOption);
    setSelectedHmoOrProviderName(selectedOption?.label || null);
  };

  const validateFields = () => {
    const newErrors = {};

    // Only an enrollee types their own name — an HMO or HCF complaint is
    // filed by the organisation, with the signed-in user recorded for audit.
    if (
      selectedAccountType === "Enrollee" ||
      (selectedAccountType === "Whistleblower" &&
        firstInfo?.isAnonymous === "false")
    ) {
      if (!firstInfo.firstName?.trim())
        newErrors.firstName = "First name is required.";
      if (!firstInfo.lastName?.trim())
        newErrors.lastName = "Last name is required.";
    }
    if (filesFromPortal && !isLoggedIn) {
      newErrors.organization =
        "Log in with your organisation's portal account to file this complaint.";
    }
    if (
      selectedAccountType === "HMO" ||
      selectedAccountType === "Provider"
      // || selectedAccountType === "Whistleblower"
    ) {
      if (!firstInfo.organization?.trim()) {
        newErrors.organization = "This field is required";
      }
    }
    if (!firstInfo.contactAddress?.trim())
      newErrors.contactAddress = "Contact address is required.";
    if (!firstInfo.email?.trim()) newErrors.email = "Email is required.";
    if (!firstInfo.phone?.trim()) newErrors.phone = "Phone number is required.";
    else if (firstInfo.phone.length !== 13) {
      // '234' country code + 10 digits
      newErrors.phone = "Phone number is invalid.";
    }

    if (firstInfo.phone?.trim() === firstInfo.altPhone?.trim())
      newErrors.altPhone =
        "Alternative phone number must be different from phone number.";
    if (firstInfo.altPhone?.trim() && firstInfo.altPhone.length !== 13) {
      newErrors.altPhone = "Alternative phone number is invalid.";
    }

    // if (!firstInfo.nhiaNo?.trim()) newErrors.nhiaNo = "NHIA number is required";
    // else if (!/^KAI-\d{8}$/.test(firstInfo.nhiaNo)) {
    //   newErrors.nhiaNo = "NHIA number must be in the format KAI-12345678";
    // }
    if (!firstInfo.complaint_against)
      newErrors.complaint_against = "Please select a complaint option.";
    if (firstInfo.complaint_against === "Enrollee") {
      // if (!firstInfo.enrolleeNo?.trim()) {
      //   newErrors.enrolleeNo = "Enrollee NHIA number is required.";
      // } else if (!/^KAI-\d{8}$/.test(firstInfo.enrolleeNo)) {
      //   newErrors.enrolleeNo =
      //     "Enrollee NHIA number must be in the format KAI-12345678";
      // } else
      if (firstInfo.nhiaNo?.trim() === firstInfo.enrolleeNo?.trim()) {
        newErrors.enrolleeNo = "You cannot file a complaint against yourself.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log(errors, firstInfo, "errors");

  const handleNext = () => {
    if (validateFields()) {
      setFirstInfo((prev) => ({
        ...prev,
        hmoId: selectedHmo?.value || null,
        providerId: selectedProvider?.value || null,
        complainant_organization_id: signedInOrganizationId || null,
        selectedHmoOrProviderName: selectedHmoOrProviderName || null,
        enrolleeNo:
          firstInfo.complaint_against === "Enrollee"
            ? firstInfo.enrolleeNo
            : null,
      }));
      onNext();
    }
  };

  console.log(firstInfo, "firstInfo");

  return (
    <TwoColumnLayout
      title="Tell us about yourself"
      subtitle="Your details help us verify enrollment and contact you with updates."
      rightColumnSx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: "70%", md: "85%", lg: "57%" },
          p: { xs: 3, md: 5 },
          borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",
          border: "1px solid #F0F0F0",
          overflow: "unset",
        }}
      >
        <FormCardHeader
          title="Complainant Details"
          subtitle="Your personal and contact information"
          titleSx={{ fontSize: "20px", color: "#1B1C1E" }}
        />
        <form>
          {selectedAccountType === "Whistleblower" && (
            <Box
              flex={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.6,
                mb: 1.6,
              }}
            >
              {/* <Typography
              sx={{
                color: "#595959",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              
              <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
            </Typography> */}

              <Box>
                <RadioGroup
                  name="isAnonymous"
                  value={firstInfo.isAnonymous}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="false"
                    control={<Radio color="success" />}
                    label="Identify Myself"
                    checked={firstInfo.isAnonymous === "false"}
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio color="success" />}
                    label="Remain Anonymous"
                    checked={firstInfo.isAnonymous === "true"}
                  />
                </RadioGroup>
              </Box>
              {errors.isAnonymous && (
                <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                  {errors.isAnonymous}
                </Typography>
              )}
            </Box>
          )}
          {selectedAccountType === "Enrollee" ||
          (selectedAccountType === "Whistleblower" &&
            firstInfo?.isAnonymous === "false") ? (
            <>
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={2}
              >
                <Box
                  flex={1}
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <Typography
                    sx={{
                      color: "#595959",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    First Name
                    <span style={{ color: "#099243", marginLeft: "6px" }}>
                      *
                    </span>
                  </Typography>
                  <TextField
                    name="firstName"
                    fullWidth
                    variant="outlined"
                    required
                    placeholder="enter first name"
                    sx={textFieldStyles}
                    value={firstInfo.firstName}
                    onChange={handleInputChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Box>
                <Box
                  flex={1}
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <Typography
                    sx={{
                      color: "#595959",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    Last Name
                    <span style={{ color: "#099243", marginLeft: "6px" }}>
                      *
                    </span>
                  </Typography>
                  <TextField
                    name="lastName"
                    fullWidth
                    variant="outlined"
                    required
                    placeholder="enter last name"
                    sx={textFieldStyles}
                    value={firstInfo.lastName}
                    onChange={handleInputChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={2}
                mt={2}
              >
                <Box
                  flex={1}
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <Typography
                    sx={{
                      color: "#595959",
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    Middle Name
                  </Typography>
                  <TextField
                    name="middleName"
                    fullWidth
                    variant="outlined"
                    placeholder="enter middle name"
                    sx={textFieldStyles}
                    value={firstInfo.middleName}
                    onChange={handleInputChange}
                    error={!!errors.middleName}
                    helperText={errors.middleName}
                  />
                </Box>
              </Box>
            </>
          ) : filesFromPortal ? (
            /* An HMO or HCF files from inside the portal, so the organisation
               and the person filing both come from the signed-in account.
               Nothing here is typed — the individual is captured for audit,
               and the complainant of record is the organisation. */
            <Box
              flex={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                {selectedAccountType === "HMO"
                  ? "HMO"
                  : "Health Care Facility (HCF)"}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#F6F8F6",
                  border: "1px solid #E0E0E0",
                  borderRadius: "12px",
                  p: 2,
                }}
              >
                <Typography
                  sx={{ fontSize: "16px", fontWeight: 600, color: "#1B1C1E" }}
                >
                  {signedInOrganization?.label ||
                    firstInfo.organization ||
                    "Organisation not linked to this account"}
                </Typography>
                <Typography sx={{ fontSize: "13px", color: "#6B6B6B", mt: 1 }}>
                  Logged by {signedInName || "—"}
                  {user?.email ? ` (${user.email})` : ""}
                </Typography>
                <Typography
                  sx={{ fontSize: "12px", color: "#6B6B6B", mt: 0.5 }}
                >
                  Recorded for audit. The complaint is filed on behalf of your
                  organisation.
                </Typography>
              </Box>
              {errors.organization && (
                <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                  {errors.organization}
                </Typography>
              )}
            </Box>
          ) : // : selectedAccountType === "Whistleblower" ? (
          //   <Box
          //     flex={1}
          //     sx={{
          //       display: "flex",
          //       flexDirection: "column",
          //       gap: 1,
          //       my: 2,
          //     }}
          //   >
          //     <Typography
          //       sx={{
          //         color: "#595959",
          //         fontSize: "16px",
          //         fontWeight: 500,
          //         lineHeight: "24px",
          //       }}
          //     >
          //       Organization Name
          //     </Typography>
          //     <Box>
          //       <TextField
          //         name="organization"
          //         fullWidth
          //         variant="outlined"
          //         required
          //         placeholder="Organization Name"
          //         sx={textFieldStyles}
          //         value={firstInfo.organization}
          //         onChange={handleInputChange}
          //         error={!!errors.organization}
          //         helperText={errors.organization}
          //       />
          //       {errors.organization && (
          //         <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
          //           {errors.organization}
          //         </Typography>
          //       )}
          //     </Box>
          //   </Box>
          // )
          null}
          <Box mt={2}>
            {selectedAccountType !== "Whistleblower" ? (
              <Box
                flex={1}
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                mb={2}
              >
                <Typography
                  sx={{
                    color: "#595959",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
                  }}
                >
                  NHIA Number / Code
                </Typography>
                <TextField
                  name="nhiaNo"
                  fullWidth
                  variant="outlined"
                  required
                  placeholder="NHIA Number / Code"
                  sx={textFieldStyles}
                  value={firstInfo.nhiaNo}
                  onChange={handleInputChange}
                  // error={!!errors.nhiaNo}
                  // helperText={errors.nhiaNo}
                />
              </Box>
            ) : null}
            <Box
              flex={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Contact Address
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <TextField
                name="contactAddress"
                fullWidth
                variant="outlined"
                required
                placeholder="e.g H23 dolphin estate"
                sx={textFieldStyles}
                value={firstInfo.contactAddress}
                onChange={handleInputChange}
                error={!!errors.contactAddress}
                helperText={errors.contactAddress}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
            mt={2}
          >
            <Box
              flex={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Email Address
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <TextField
                name="email"
                fullWidth
                variant="outlined"
                required
                type="email"
                placeholder="example@example.com"
                sx={textFieldStyles}
                value={firstInfo.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
            mt={2}
          >
            <Box
              flex={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Phone Number
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <FormControl fullWidth>
                <PhoneInput
                  country={"ng"}
                  inputStyle={formControlStyles}
                  inputProps={{
                    label: "Phone Number",
                    variant: "outlined",
                    margin: "normal",
                    fullWidth: true,
                  }}
                  value={firstInfo.phone || ""}
                  onChange={handlePhoneChange}
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                    {errors.phone}
                  </Typography>
                )}
              </FormControl>
            </Box>

            <Box
              flex={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Alternative Phone Number
              </Typography>
              <FormControl fullWidth>
                <PhoneInput
                  country={"ng"}
                  inputStyle={formControlStyles}
                  inputProps={{
                    label: "Alternative Phone Number",
                    variant: "outlined",
                    margin: "normal",
                    fullWidth: true,
                  }}
                  value={firstInfo.altPhone || ""}
                  onChange={handleAltPhoneChange}
                />
                {errors.altPhone && (
                  <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                    {errors.altPhone}
                  </Typography>
                )}
              </FormControl>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
            mt={2}
          >
            <Box
              flex={1}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Complaint against
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <ReactSelect
                name="complaint_against"
                styles={selectStyles}
                value={
                  respondentOptions.find(
                    (opt) => opt.value === firstInfo.complaint_against,
                  ) || null
                }
                onChange={handleComplaintChange}
                options={respondentOptions}
                placeholder="Select Option"
              />
              {errors.complaint_against && (
                <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                  {errors.complaint_against}
                </Typography>
              )}
            </Box>
          </Box>

          {firstInfo.complaint_against === "HMO" ? (
            <Box
              flex={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                HMO Name
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <Box>
                <StakeholderSelect
                  kind="HMO"
                  value={selectedHmo}
                  onChange={handleHmoChange}
                  error={errors.hmo}
                />
                {errors.hmo && (
                  <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                    {errors.hmo}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : firstInfo.complaint_against === "Provider" ? (
            <Box
              flex={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Health Care Facility (HCF)
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <Box>
                <StakeholderSelect
                  kind="Provider"
                  value={selectedProvider}
                  onChange={handleProviderChange}
                  error={errors.provider}
                />
                {errors.provider && (
                  <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                    {errors.provider}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : firstInfo.complaint_against === "Enrollee" ? (
            <Box
              flex={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                my: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Enrollee NHIA Number
              </Typography>
              <Box>
                <TextField
                  name="enrolleeNo"
                  fullWidth
                  variant="outlined"
                  required
                  placeholder="Enrollee NHIA Number"
                  sx={textFieldStyles}
                  value={firstInfo.enrolleeNo}
                  onChange={handleInputChange}
                  error={!!errors.enrolleeNo}
                  helperText={errors.enrolleeNo}
                />
                {errors.provider && (
                  <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                    {errors.provider}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : null}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "flex-end",
              // alignItems: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{
                  width: "87px",
                  height: "48px",
                  borderRadius: "16px",
                  py: 1.5,
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  textTransform: "capitalize",
                  borderColor: "#1B5E20",
                  color: "#1B5E20",
                  "&:hover": { borderColor: "#1B5E20" },
                }}
                onClick={onBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: "fit-content",
                  height: "48px",
                  borderRadius: "16px",
                  py: 1.5,
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  textTransform: "capitalize",
                  backgroundColor: "#1B5E20",
                  "&:hover": { backgroundColor: "#1B5E20" },
                }}
                // href="/enrollee-complaint-second-form"
                onClick={handleNext}
              >
                Save & Continue
              </Button>
            </Box>
          </Box>
        </form>
      </Card>
    </TwoColumnLayout>
  );
};

export default FirstForm;

FirstForm.propTypes = {
  firstInfo: PropTypes.object,
  setFirstInfo: PropTypes.func.isRequired,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  btn: PropTypes.any,
  selectedAccountType: PropTypes.string,
};
