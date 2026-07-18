import { Box, Typography, Button, Card } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getStates } from "../../../services/settings";
import ReactSelect from "react-select";
import { selectStyles } from "../../../utils/style";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TwoColumnLayout from "./TwoColumnLayout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormCardHeader from "./FormCardHeader";

const StateSelection = ({ stateInfo, setStateInfo, onNext, onBack }) => {
  const [errors, setErrors] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const states = useMemo(
    () =>
      data?.results?.map((t) => ({
        value: t.id,
        label: t.name,
      })) || [],
    [data],
  );

  const handleStateChange = (selectedOption) => {
    setStateInfo(selectedOption?.value);
    setErrors((prev) => ({ ...prev, state: "" }));
  };

  const selectedState = useMemo(() => {
    const foundState =
      states.find((state) => state.value === stateInfo) || null;
    return foundState;
  }, [stateInfo, states]);

  const handleValidateAndNext = () => {
    const newErrors = {};

    // if (!stateInfo) {
    //   newErrors.state = "Please select a state.";
    // }

    // setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <TwoColumnLayout
      title="Where did the incident occur?"
      subtitle="Select the NHIA state office for the location where your complaint originated. This routes your case to the right team."
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormCardHeader
            title="Select NHIA State Office"
            subtitle="Which state did the incident happen in?"
          />

          <Box>
            <ReactSelect
              styles={selectStyles}
              value={selectedState}
              onChange={handleStateChange}
              options={states}
              placeholder={isLoading ? "Loading..." : "Select State"}
              isLoading={isLoading}
            />
            <Typography sx={{ color: "#9E9E9E", fontSize: "13px", mt: 0.5 }}>
              This determines which NHIA office handles your complaint
            </Typography>
            {errors.state && (
              <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                {errors.state}
              </Typography>
            )}
          </Box>
        </Box>

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
              width: "fit-content",
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
            onClick={handleValidateAndNext}
          >
            Save & Continue
          </Button>
        </Box>
      </Card>
    </TwoColumnLayout>
  );
};

StateSelection.propTypes = {
  stateInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setStateInfo: PropTypes.func.isRequired,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  btn: PropTypes.node,
};

export default StateSelection;
