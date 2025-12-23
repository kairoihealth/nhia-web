import { Box, Button, TextField, Typography } from "@mui/material";
import SuccessModal from "../../../shared/SuccessModal";
import { useMemo, useState } from "react";
import ReactSelect from "react-select";
import { selectStyles, textFieldStyles } from "../../../utils/style";
import { useQuery } from "@tanstack/react-query";
import {
  addHmo,
  addProvider,
  getAllHmo,
  getAllProviders,
} from "../../../services/settings";
import { useHandleError } from "../../../hooks/useToastHandler";
import { inviteStateUser, inviteUser } from "../../../services/central";
import { useNavigate } from "react-router-dom";

const accountType = [
  { id: "HMO", label: "Hmo", value: "HMO" },
  { id: "Provider", label: "Provider", value: "Provider" },
];
const InvitationForm = () => {
  const stateId = localStorage.getItem("stateId");
  const navigate = useNavigate();
  const handleError = useHandleError();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [hmo, setHmo] = useState("");
  const [provider, setProvider] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleInputChange = (event) => {
    console.log(event.target.name, event.target.value, "event");
    if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "hmo") setHmo(event.target.value);
    else if (event.target.name === "provider") setProvider(event.target.value);

    // setEmail(event.target.value);
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
  };

  const validateFields = () => {
    const newErrors = {};

    if (!email?.trim()) newErrors.email = "Email is required.";
    if (!selectedType) newErrors.type = "Account type is required.";
    if (selectedType.value === "HMO" && !hmo)
      newErrors.hmo = "Please select an HMO";
    if (selectedType.value === "Provider" && !provider)
      newErrors.provider = "Please select a Provider";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!validateFields()) {
        return;
      }

      let res;

      if (selectedType.value === "HMO")
        res = await addHmo({ name: hmo, state: stateId });
      if (selectedType.value === "Provider")
        res = await addProvider({ name: provider, state: stateId });
      console.log(res, "restt");
      const payload = {
        email: email,
        role: selectedType.value === "HMO" ? "HMO" : "Provider",
        ...(selectedType.value === "HMO" && { hmo: res.id }),
        ...(selectedType.value === "Provider" && {
          provider: res.id,
        }),
      };

      await inviteStateUser(payload);
      // await inviteUser(payload);

      setModalOpen(true);
      setTimeout(() => {
        navigate("/stateadmin/invitations");
        setEmail("");
        setSelectedType(null);
        setHmo(null);
        setProvider(null);
      }, 4000);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(errors, "payload");

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "28px",
          color: "#101828",
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
          py: 4,
        }}
      >
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{
              color: "#595959",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
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
            name="email"
            value={email}
            onChange={handleInputChange}
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
              lineHeight: "24px",
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
                lineHeight: "24px",
              }}
            >
              HMO Name
              <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
            </Typography>
            <Box>
              <TextField
                fullWidth
                variant="outlined"
                required
                placeholder="Enter HMO Name"
                sx={textFieldStyles}
                name="hmo"
                value={hmo}
                onChange={handleInputChange}
                error={!!errors.hmo}
                helperText={errors.hmo}
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
                lineHeight: "24px",
              }}
            >
              Providers Name
              <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
            </Typography>
            <Box>
              <TextField
                fullWidth
                variant="outlined"
                required
                placeholder="Enter Provider Name"
                sx={textFieldStyles}
                name="provider"
                value={provider}
                onChange={handleInputChange}
                error={!!errors.provider}
                helperText={errors.provider}
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
              "&:hover": { backgroundColor: "#027A3B" },
            }}
            loading={isSubmitting}
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
