import Logo from "../../../assets/nhia-logo.png";
import { Box, TextField, Button, FormControl, Typography } from "@mui/material";
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

const option = [
  { value: "HMO", label: "Hmo" },
  { value: "Provider", label: "Provider" },
  { value: "Enrollee", label: "Enrollee" },
  { value: "NHIA", label: "NHIA" },
];

const FirstForm = ({ firstInfo, setFirstInfo, onNext, onBack, btn }) => {
  const [errors, setErrors] = useState({});
  const [selectedHmo, setSelectedHmo] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedHmoOrProviderName, setSelectedHmoOrProviderName] =
    useState(null);

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
    [hmosData]
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
    [providersData]
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

  const validateFields = () => {
    const newErrors = {};

    if (!firstInfo.firstName?.trim())
      newErrors.firstName = "First name is required.";
    if (!firstInfo.lastName?.trim())
      newErrors.lastName = "Last name is required.";
    // if (!firstInfo.middleName?.trim())
    //   newErrors.middleName = "Middle name is required.";
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

    if (!firstInfo.nhiaNo?.trim()) newErrors.nhiaNo = "NHIA number is required";
    else if (!/^KAI-\d{8}$/.test(firstInfo.nhiaNo)) {
      newErrors.nhiaNo = "NHIA number must be in the format KAI-12345678";
    }
    if (!firstInfo.complaint_against)
      newErrors.complaint_against = "Please select a complaint option.";
    if (firstInfo.complaint_against === "Enrollee") {
      if (!firstInfo.enrolleeNo?.trim()) {
        newErrors.enrolleeNo = "Enrollee NHIA number is required.";
      } else if (!/^KAI-\d{8}$/.test(firstInfo.enrolleeNo)) {
        newErrors.enrolleeNo =
          "Enrollee NHIA number must be in the format KAI-12345678";
      } else if (firstInfo.nhiaNo?.trim() === firstInfo.enrolleeNo?.trim()) {
        newErrors.enrolleeNo = "You cannot file a complaint against yourself.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    <>
      <Box
        sx={{
          backgroundColor: { xs: "#FFFFFF", md: "#038F3E" },
        }}
      >
        <Box
          sx={{
            display: { xs: "grid", md: "flex" },
            justifyContent: "center",
            alignItems: { xs: "flex-start", md: "center" },
            pt: { xs: 0, md: 4 },
          }}
        >
          <Box>
            <Box
              sx={{
                width: { xs: "400px", md: "1280px" },
                backgroundColor: "#fff",
                padding: "2rem",
                margin: { xs: 0, md: "2rem" },
                borderRadius: "8px",
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{ display: "block", margin: "0 auto" }}
              />
              <Typography
                align="center"
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  color: "#038F3E",
                  margin: "1rem 0",
                }}
              >
                Complaint Form
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  color: "#1B1C1E",
                  my: 4,
                }}
              >
                Complainant Details
              </Typography>
              <form>
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
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      name="middleName"
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="enter middle name"
                      sx={textFieldStyles}
                      value={firstInfo.middleName}
                      onChange={handleInputChange}
                      error={!!errors.middleName}
                      helperText={errors.middleName}
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
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
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
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
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
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
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
                        <Typography
                          sx={{ color: "red", fontSize: "13px", mt: 0.5 }}
                        >
                          {errors.phone}
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
                      NHIA Number
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      name="nhiaNo"
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="KAI-12345678"
                      sx={textFieldStyles}
                      value={firstInfo.nhiaNo}
                      onChange={handleInputChange}
                      error={!!errors.nhiaNo}
                      helperText={errors.nhiaNo}
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
                        <Typography
                          sx={{ color: "red", fontSize: "13px", mt: 0.5 }}
                        >
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
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <ReactSelect
                      name="complaint_against"
                      styles={selectStyles}
                      value={option.find(
                        (opt) => opt.value === firstInfo.complaint_against
                      )}
                      onChange={handleComplaintChange}
                      options={option}
                      placeholder="Select Option"
                    />
                    {errors.complaint_against && (
                      <Typography
                        sx={{ color: "red", fontSize: "13px", mt: 0.5 }}
                      >
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
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
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
                        <Typography
                          sx={{ color: "red", fontSize: "13px", mt: 0.5 }}
                        >
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
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
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
                        <Typography
                          sx={{ color: "red", fontSize: "13px", mt: 0.5 }}
                        >
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
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <Box>
                      <TextField
                        name="enrolleeNo"
                        fullWidth
                        variant="outlined"
                        required
                        placeholder="KAI-12345678"
                        sx={textFieldStyles}
                        value={firstInfo.enrolleeNo}
                        onChange={handleInputChange}
                        error={!!errors.enrolleeNo}
                        helperText={errors.enrolleeNo}
                      />
                      {errors.provider && (
                        <Typography
                          sx={{ color: "red", fontSize: "13px", mt: 0.5 }}
                        >
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
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      display: { xs: "grid", md: "flex" },
                      justifyContent: { xs: "center", md: "flex-end" },
                      gap: 2,
                      mt: 4,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        width: "270px",
                        height: "48px",
                        borderRadius: "16px",
                        py: 1.5,
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px",
                        textTransform: "capitalize",
                        borderColor: "#038F3E",
                        color: "#038F3E",
                        "&:hover": { borderColor: "#038F3E" },
                      }}
                      // href="/account-type"
                      onClick={onBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: "270px",
                        height: "48px",
                        borderRadius: "16px",
                        py: 1.5,
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: 500,
                        lineHeight: "24px",
                        textTransform: "capitalize",
                        backgroundColor: "#038F3E",
                        "&:hover": { backgroundColor: "#038F3E" },
                      }}
                      // href="/enrollee-complaint-second-form"
                      onClick={handleNext}
                    >
                      Save & Continue
                    </Button>
                  </Box>
                  <Box sx={{ width: "20%", my: 2 }}>{btn}</Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FirstForm;

FirstForm.propTypes = {
  firstInfo: PropTypes.object,
  setFirstInfo: PropTypes.func.isRequired,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  btn: PropTypes.any,
};
