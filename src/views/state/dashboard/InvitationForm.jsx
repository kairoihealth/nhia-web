import { Box, Button, TextField, Typography } from "@mui/material";
import SuccessModal from "../../../shared/SuccessModal";
import { useMemo, useState } from "react";
import ReactSelect from "react-select";
import { selectStyles, textFieldStyles } from "../../../utils/style";
import { useQuery } from "@tanstack/react-query";
import { getAllHmo, getAllProviders } from "../../../services/settings";
import { useHandleError } from "../../../hooks/useToastHandler";
import { inviteStateUser } from "../../../services/central";

const accountType = [
  { id: "HMO", label: "Hmo", value: "HMO" },
  { id: "Provider", label: "Provider", value: "Provider" }
];
const InvitationForm = () => {
  const handleError = useHandleError();
  const [email, setEmail] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedHmo, setSelectedHmo] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const hmosQueryKey = useMemo(() => ["hmos"], []);
  const { data: hmosData } = useQuery({
    queryKey: hmosQueryKey,
    queryFn: () => getAllHmo({ page: 1, pageSize: 100 })
  });

  const hmos = useMemo(
    () =>
      hmosData?.results?.map((hmo) => ({
        value: hmo.id,
        label: hmo.name
      })) || [],
    [hmosData]
  );

  const providersQueryKey = useMemo(() => ["providers"], []);
  const { data: providersData } = useQuery({
    queryKey: providersQueryKey,
    queryFn: () => getAllProviders({ page: 1, pageSize: 100 })
  });

  const providers = useMemo(
    () =>
      providersData?.results?.map((provider) => ({
        value: provider.id,
        label: provider.name
      })) || [],
    [providersData]
  );

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
  };

  const handleHmoChange = (selectedOption) => {
    setSelectedHmo(selectedOption);
  };

  const handleProviderChange = (selectedOption) => {
    setSelectedProvider(selectedOption);
  };

  const validateFields = () => {
    const newErrors = {};

    if (!email?.trim()) newErrors.email = "Email is required.";
    if (!selectedType) newErrors.type = "Account type is required.";
    if (!selectedHmo) newErrors.hmo = "Please select an HMO";
    if (!selectedProvider) newErrors.provider = "Please select a Provider";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    try {
      if (!validateFields()) {
        return;
      }
      const payload = {
        email: email,
        role: selectedType.value === "HMO" ? "HMO" : "Provider",
        ...(selectedType.value === "HMO" && { hmo: selectedHmo.value }),
        ...(selectedType.value === "Provider" && {
          provider: selectedProvider.value
        })
      };

      await inviteStateUser(payload);
      setModalOpen(true);
      // Optionally reset form fields after successful submission
      setEmail("");
      setSelectedType(null);
      setSelectedHmo(null);
      setSelectedProvider(null);
    } catch (error) {
      handleError("Failed to send invitation:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "28px",
          color: "#101828"
        }}
      >
        Send Invite
      </Typography>

      {/* Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "40%",
          py: 4
        }}
      >
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              color: "#595959",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            Official Email Address
            <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            required
            placeholder="enter@gmail.com"
            sx={textFieldStyles}
            value={email}
            onChange={handleEmailChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Box>

        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              color: "#595959",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            Select account type
            <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
          </Typography>

          <Box>
            <ReactSelect
              styles={selectStyles}
              value={selectedType}
              onChange={handleTypeChange}
              options={accountType}
              placeholder="Select Account Type"
            />
            {errors.type && (
              <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                {errors.type}
              </Typography>
            )}
          </Box>
        </Box>

        {selectedType?.value === "HMO" ? (
          <Box
            flex={1}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <Typography
              sx={{
                color: "#595959",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px"
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
        ) : (
          <Box
            flex={1}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <Typography
              sx={{
                color: "#595959",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px"
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
        )}

        {/* Button */}
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <Button
            variant="contained"
            size="medium"
            onClick={handleSubmit}
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "21.6px",
              borderRadius: "8px",
              backgroundColor: "#038F3E",
              color: "#FFFFFF",
              width: "347px",
              py: "12px",
              px: "8px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#027A3B" }
            }}
          >
            Send Invitation
          </Button>
        </Box>
      </Box>

      {/* Modal */}
      <SuccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Invite Sent"
        message="You have successfully sent an invite to"
        recipient={`${email}`}
      />
    </Box>
  );
};

export default InvitationForm;
