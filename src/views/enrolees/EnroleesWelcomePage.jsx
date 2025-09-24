// import { Helmet } from "react-helmet-async";
import { Box, Typography, Button } from "@mui/material";
import Logo from "../../assets/nhia-logo.png";
import KairoiLogo from "../../assets/kairoi-logo.png";
import { useQuery } from "@tanstack/react-query";
import { getStates } from "../../services/settings";
import ReactSelect from "react-select";
import { selectStyles } from "../../utils/style";
import { useState } from "react";

const EnroleesWelcomePage = () => {
  const [selectedState, setSelectedState] = useState("");

  const { data: states, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  return (
    <>
      <Box sx={{ display: { xs: "grid", md: "flex" }, height: "100vh" }}>
        {/* Left Column */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            backgroundColor: "#038F3E",
            color: "#fff",
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: { xs: "center", md: "flex-start" },
            position: "relative",
            height: { xs: "auto", md: "100vh" },
          }}
        >
          <Box>
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ width: { xs: "70px", md: "100px" } }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "80%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "32px", md: "58px" },
                fontWeight: 600,
                lineHeight: { xs: "43.2px", md: "68.3px" },
                mt: { xs: 2, md: 5 },
                textAlign: { xs: "center", md: "left" },
                width: { xs: "90%", md: "90%" },
              }}
            >
              Welcome to NHIA Complaint Management System
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "20px", md: "24px" },
                fontWeight: 400,
                lineHeight: { xs: "27px", md: "32.4px" },
                mt: 3,
                textAlign: { xs: "center", md: "left" },
                width: { xs: "70%", md: "90%" },
              }}
            >
              Welcome aboard! Your complaints fuel our quest for service
              perfection.
            </Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              mt: 5,
            }}
          >
            <span></span>
            <Box
              sx={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "16px", fontWeight: 500, lineHeight: "32.4px" }}
              >
                Powered by
              </Typography>
              <Box
                component="img"
                src={KairoiLogo}
                alt="KairoiLogo"
                sx={{ width: "70px" }}
              />
            </Box>
          </Box>
        </Box>

        {/* Right Column */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 2, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "24px" },
                fontWeight: 500,
                lineHeight: { xs: "21.6px", md: "43.2px" },
                color: "#038F3E",
                textAlign: "left",
                mb: 2,
              }}
            >
              Select NHIA
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

            <ReactSelect
              styles={selectStyles}
              value={selectedState}
              onChange={handleStateChange}
              options={states}
              placeholder={isLoading ? "Loading..." : "Select state"}
              isLoading={isLoading}
            />

            {/* <Link
              href="/enrollee-complaint-review"
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: { xs: "21.6px", md: "27px" },
                color: "#038F3E",
                textDecoration: "none",
                // '&:hover': { textDecoration: 'underline' }
              }}
            >
              Review of existing complaint or request
            </Link> */}
          </Box>

          <Box
            sx={{
              display: { xs: "grid", md: "flex" },
              justifyContent: { xs: "center", md: "flex-end" },
              gap: 2,
              mb: { xs: 2, md: 6 },
            }}
          >
            <Button
              variant="outlined"
              href="/"
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
            >
              Back
            </Button>
            <Button
              variant="contained"
              href="/enrollee-complaint-first-form"
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
            >
              Save & Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EnroleesWelcomePage;
