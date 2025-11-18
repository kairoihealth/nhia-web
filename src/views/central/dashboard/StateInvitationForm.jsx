import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import SuccessModal from "../../../shared/SuccessModal";
import { useMemo, useState } from "react";
import { getStates } from "../../../services/settings";
import ReactSelect from "react-select";
import { selectStyles, textFieldStyles } from "../../../utils/style";
import { useHandleError } from "../../../hooks/useToastHandler";
// import useAuth from "../../../hooks/useAuth";
import { inviteUser } from "../../../services/central";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const StateInvitationForm = () => {
  const navigate = useNavigate();
  const handleError = useHandleError();
  // const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const { data: statesData, isLoading: statesLoading } = useQuery({
    queryKey: ["statesQueryKey"],
    queryFn: () =>
      getStates({
        page: 1,
        pageSize: 100,
      }),
  });

  const states = useMemo(
    () =>
      statesData?.results?.map((state) => ({
        value: state.id,
        label: state.name,
      })) || [],
    [statesData]
  );

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateFields = () => {
    const newErrors = {};

    if (!email?.trim()) newErrors.email = "Email is required.";
    if (!selectedState) newErrors.state = "State is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!validateFields()) {
        return;
      }

      const payload = {
        email: email,
        role: "StateAdmin",
        state: selectedState.value,
      };

      await inviteUser(payload);
      setModalOpen(true);
      setTimeout(() => {
        navigate("/admin/state/invite");
        setEmail("");
        setSelectedState(null);
      }, 4000);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              lineHeight: "24px",
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
        message={"You have successfully sent an invite to"}
        recipient={`${email}`}
      />
    </Box>
  );
};

export default StateInvitationForm;
