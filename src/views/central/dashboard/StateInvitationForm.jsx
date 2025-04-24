import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from "@mui/material";
import SuccessModal from "../../../shared/SuccessModal";
import { useMemo, useState } from "react";
import { getRegions, getStatesByRegion } from "../../../services/settings";
import ReactSelect from "react-select";
import { selectStyles, textFieldStyles } from "../../../utils/style";
import { useHandleError } from "../../../hooks/useToastHandler";
// import useAuth from "../../../hooks/useAuth";
import { inviteStateUser } from "../../../services/central";
import { useQuery } from "@tanstack/react-query";

const StateInvitationForm = () => {
  const handleError = useHandleError();
  // const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const regionsQueryKey = useMemo(() => ["regions"], []);
  const { data: regionsData, isLoading: regionsLoading } = useQuery({
    queryKey: regionsQueryKey,
    queryFn: () => getRegions({ page: 1, pageSize: 100 })
  });

  const regions = useMemo(
    () =>
      regionsData?.results?.map((region) => ({
        value: region.id,
        label: region.name
      })) || [],
    [regionsData]
  );

  const statesQueryKey = useMemo(
    () => ["states", selectedRegion?.value],
    [selectedRegion?.value]
  );
  const { data: statesData, isLoading: statesLoading } = useQuery({
    queryKey: statesQueryKey,
    queryFn: () =>
      selectedRegion
        ? getStatesByRegion({
            page: 1,
            pageSize: 100,
            region: selectedRegion.value
          })
        : null,
    enabled: !!selectedRegion // Only run if selectedRegion exists
  });

  const states = useMemo(
    () =>
      statesData?.results?.map((state) => ({
        value: state.id,
        label: state.name
      })) || [],
    [statesData]
  );

  const handleRegionChange = (selectedOption) => {
    setSelectedRegion(selectedOption);
    setSelectedState(null);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateFields = () => {
    const newErrors = {};

    if (!email?.trim()) newErrors.email = "Email is required.";
    if (!selectedRegion) newErrors.region = "Region is required.";
    if (!selectedState) newErrors.state = "State is required.";

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
        role: "StateAdmin",
        state: selectedState.value
      };

      await inviteStateUser(payload);
      setModalOpen(true);
      // Optionally reset form fields after successful submission
      setEmail("");
      setSelectedRegion(null);
      setSelectedState(null);
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
            Region
            <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
          </Typography>
          {regionsLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Box>
              <ReactSelect
                styles={selectStyles}
                value={selectedRegion}
                onChange={handleRegionChange}
                options={regions}
                placeholder="Select Region"
              />
              {errors.region && (
                <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                  {errors.region}
                </Typography>
              )}
            </Box>
          )}
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
            State
            <span style={{ color: "#099243", marginLeft: "6px" }}>*</span>
          </Typography>
          {statesLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Box>
              <ReactSelect
                styles={selectStyles}
                value={selectedState}
                onChange={handleStateChange}
                options={states}
                placeholder="Select State"
                isDisabled={!selectedRegion}
              />
              {errors.state && (
                <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                  {errors.state}
                </Typography>
              )}
            </Box>
          )}
        </Box>

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

export default StateInvitationForm;
