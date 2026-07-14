import { Box, Typography, Button, Link as MuiLink } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStates } from "../../services/settings";
import ReactSelect from "react-select";
import { selectStyles } from "../../utils/style";
import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import TwoColumnLayout from "../enrolees/ComplaintForm/TwoColumnLayout";
import TwoColumnLayout from "../../components/layout/TwoColumnLayout";



const OnboardingView = ({ stateInfo, setStateInfo, onNext }) => {
  const navigate = useNavigate();
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <TwoColumnLayout
      rightColumnSx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* This Box wraps all the content for the right column */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              py: 1,
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "24px", sm: "32px" },
                fontWeight: 600,
                lineHeight: { xs: "21.6px", md: "43.2px" },
                color: "#1B5E20",
                textAlign: "left",
              }}
            >
              Create a complaint
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                // lineHeight: { xs: "21.6px", md: "43.2px" },
                color: "#1B5E20",
                textAlign: "left",
                cursor: "pointer",
              }}
              onClick={handleClick}
            >
              Login to account portal
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: { xs: "16px", md: "24px" },
              fontWeight: 500,
              lineHeight: { xs: "21.6px", md: "43.2px" },
              color: "#20201E",
              textAlign: "left",
              mb: 2,
            }}
          >
            Select State
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "18px" },
              fontWeight: 400,
              lineHeight: { xs: "18.9px", md: "24.3px" },
              color: "#595959",
              mb: { xs: 2, md: 4 },
            }}
          >
            What state did the incident you want to report happen?
          </Typography>
          <Box>
            <ReactSelect
              styles={selectStyles}
              value={selectedState}
              onChange={handleStateChange}
              options={states}
              placeholder={isLoading ? "Loading..." : "Select State"}
              isLoading={isLoading}
            />
            {errors.state && (
              <Typography sx={{ color: "red", fontSize: "13px", mt: 0.5 }}>
                {errors.state}
              </Typography>
            )}
          </Box>

          <MuiLink
            href="/enrollee-complaint-review"
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: 500,
              lineHeight: { xs: "21.6px", md: "27px" },
              color: "#1B5E20",
              textDecoration: "none",
              my: 2,
              fontFamily: "General Sans,Arial,sans-serif",
              // '&:hover': { textDecoration: 'underline' }
            }}
          >
            Review of existing complaint or request
          </MuiLink>
        </Box>

        <Box
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: { xs: "center", md: "flex-end" },
          //   alignItems: { xs: "center", md: "flex-end" },
          //   mt: 2,
          // }}
          // >
          sx={{
            display: { xs: "grid", md: "flex" },
            justifyContent: { xs: "center", md: "flex-end" },
            gap: 2,
            mb: { xs: 2, md: 6 },
          }}
        >
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
              backgroundColor: "#1B5E20",
              "&:hover": { backgroundColor: "#1B5E20" },
            }}
            onClick={handleValidateAndNext}
          >
            Save & Continue
          </Button>
        </Box>
        {/* <Box sx={{ width: "20%" }}>{btn}</Box> */}
      </Box>
    </TwoColumnLayout>
  );
};

export default OnboardingView;

OnboardingView.propTypes = {
  stateInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setStateInfo: PropTypes.func.isRequired,
  onNext: PropTypes.func,
  btn: PropTypes.any,
};
