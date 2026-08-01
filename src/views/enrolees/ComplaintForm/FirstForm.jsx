import {
  Box,
  TextField,
  Button,
  FormControl,
  Typography,
  Card,
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
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllHmo, getAllProviders } from "../../../services/settings";
import TwoColumnLayout from "./TwoColumnLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormCardHeader from "./FormCardHeader";

const option = [
  { value: "HMO", label: "HMO" },
  { value: "Provider", label: "Provider" },
  { value: "Enrollee", label: "Enrollee" },
  { value: "NHIA", label: "NHIA" },
];

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
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const hmosQueryKey = useMemo(() => ["hmos"], []);
  const { data: hmosData } = useQuery({
    queryKey: hmosQueryKey,
    queryFn: () => getAllHmo({ page: 1, pageSize: 100 }),
  });

  const hmos = useMemo(
    () =>
      hmosData?.results?.map((hmo) => ({
        value: hmo.id,
        label: hmo.name,
      })) || [],
    [hmosData],
  );

  const providersQueryKey = useMemo(() => ["providers"], []);
  const { data: providersData } = useQuery({
    queryKey: providersQueryKey,
    queryFn: () => getAllProviders({ page: 1, pageSize: 100 }),
  });

  const providers = useMemo(
    () =>
      providersData?.results?.map((provider) => ({
        value: provider.id,
        label: provider.name,
      })) || [],
    [providersData],
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFirstInfo({ ...firstInfo, [name]: value });
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

  const handleHmoChange = (selectedOption) => {
    setSelectedHmo(selectedOption);
    setSelectedHmoOrProviderName(selectedOption.label);
  };

  const handleProviderChange = (selectedOption) => {
    setSelectedProvider(selectedOption);
    setSelectedHmoOrProviderName(selectedOption.label);
  };

  const handleOrganizationChange = (selectedOption) => {
    setSelectedOrganization(selectedOption);
    setFirstInfo((prev) => ({
      ...prev,
      organization: selectedOption.label,
    }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (selectedAccountType === "Enrollee") {
      if (!firstInfo.firstName?.trim())
        newErrors.firstName = "First name is required.";
      if (!firstInfo.lastName?.trim())
        newErrors.lastName = "Last name is required.";
    }
    if (
      selectedAccountType === "HMO" ||
      selectedAccountType === "Provider" ||
      selectedAccountType === "Employer"
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
        selectedHmoOrProviderName: selectedHmoOrProviderName || null,
        enrolleeNo:
          firstInfo.complaint_against === "Enrollee"
            ? firstInfo.enrolleeNo
            : null,
      }));
      onNext();
    }
  };

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
          {selectedAccountType === "Enrollee" ? (
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
          ) : selectedAccountType === "HMO" ? (
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
                <ReactSelect
                  styles={selectStyles}
                  value={selectedOrganization}
                  onChange={handleOrganizationChange}
                  options={hmos}
                  placeholder="Select HMO"
                />
                {errors.organization && (
                  <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                    {errors.organization}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : selectedAccountType === "Provider" ? (
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
                Providers Name
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <Box>
                <ReactSelect
                  styles={selectStyles}
                  value={selectedOrganization}
                  onChange={handleOrganizationChange}
                  options={providers}
                  placeholder="Select Provider"
                />
                {errors.organization && (
                  <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                    {errors.organization}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : selectedAccountType === "Employer" ? (
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
                Organization Name
              </Typography>
              <Box>
                <TextField
                  name="organization"
                  fullWidth
                  variant="outlined"
                  required
                  placeholder="Organization Name"
                  sx={textFieldStyles}
                  value={firstInfo.organization}
                  onChange={handleInputChange}
                  error={!!errors.organization}
                  helperText={errors.organization}
                />
                {errors.organization && (
                  <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                    {errors.organization}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : null}
          <Box mt={2}>
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
                value={option.find(
                  (opt) => opt.value === firstInfo.complaint_against,
                )}
                onChange={handleComplaintChange}
                options={option}
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
                <ReactSelect
                  styles={selectStyles}
                  value={selectedHmo}
                  onChange={handleHmoChange}
                  options={hmos}
                  placeholder="Select HMO"
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
                Providers Name
                <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
              </Typography>
              <Box>
                <ReactSelect
                  styles={selectStyles}
                  value={selectedProvider}
                  onChange={handleProviderChange}
                  options={providers}
                  placeholder="Select Provider"
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
