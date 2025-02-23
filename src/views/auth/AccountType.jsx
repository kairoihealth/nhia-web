import { useState } from "react";
import PropTypes from "prop-types";
// import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  Radio,
  FormControlLabel,
  Button,
  Typography,
  Box
} from "@mui/material";
import Logo from "../../assets/nhia-logo.png";
import KairoiLogo from "../../assets/kairoi-logo.png";
import Enrolee from "../../assets/enrolee.png";
import HMO from "../../assets/hmo.png";
import Provider from "../../assets/provider.png";

const AccountTypeCard = ({
  value,
  label,
  image,
  selectedAccountType,
  onChange
}) => (
  <Box
    sx={{
      width: "186px",
      height: "239px",
      p: 1,
      textAlign: "center",
      cursor: "pointer",
      border:
        selectedAccountType === value
          ? "2px solid #038F3E"
          : "1px solid #3333331F",
      borderRadius: "12px"
      // m: 1,
      // flexBasis: '45%'
    }}
    onClick={() => onChange({ target: { value } })}
  >
    <FormControlLabel
      value={value}
      control={<Radio checked={selectedAccountType === value} />}
      label=""
      sx={{
        display: "block",
        textAlign: "left",
        cursor: "pointer",
        "& .MuiRadio-root": { color: "#038F3E" },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#038F3E" // Green border color
        }
      }}
    />
    <Box
      component="img"
      src={image}
      alt={label}
      sx={{
        width: "82px",
        height: "101px",
        objectFit: "contain",
        mx: "auto",
        display: "block"
      }}
    />
    <Typography
      sx={{
        fontSize: { xs: "18px", md: "20px" },
        fontWeight: 500,
        lineHeight: "32.4px",
        mt: 2,
        color: "#1B1C1E"
      }}
    >
      {label}
    </Typography>
  </Box>
);

const AccountType = () => {
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const navigate = useNavigate();

  const handleSelection = (event) => {
    setSelectedAccountType(event.target.value);
  };

  const handleSubmit = () => {
    const routes = {
      enrollee: "/enrollees-welcome-page",
      hmo: "/hmo-welcome-page",
      provider: "/providers-welcome-page"
    };

    if (selectedAccountType && routes[selectedAccountType]) {
      // Pass the role via navigation state
      navigate(routes[selectedAccountType], {
        state: { role: selectedAccountType },
      });
    } else {
      alert("Please select an account type");
    }
  };

  const accountTypes = [
    { id: 1, value: "enrollee", label: "I am an Enrollee", image: Enrolee },
    { id: 2, value: "hmo", label: "I am an HMO", image: HMO },
    { id: 3, value: "provider", label: "I am a Provider", image: Provider }
  ];

  return (
    <>
      {/* <Helmet>
        <title>Account Type</title>
        <meta name="Account Type" content=" " />
        <link rel="canonical" href="/" />
      </Helmet> */}
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
            height: { xs: "auto", md: "100vh" }
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
              alignItems: "center"
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "32px", md: "58px" },
                fontWeight: 600,
                lineHeight: { xs: "43.2px", md: "68.3px" },
                mt: { xs: 2, md: 5 },
                textAlign: { xs: "center", md: "left" },
                width: { xs: "90%", md: "90%" }
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
                width: { xs: "70%", md: "90%" }
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
              alignItems: "flex-end",
              mt: 5
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
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
            p: { xs: 4, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "43.2px",
                color: "#038F3E",
                textAlign: { xs: "center", md: "left" }
              }}
            >
              Choose a complaint type
            </Typography>
            <Box
              sx={{ width: { xs: "100%", md: "80%" }, px: { xs: 2, md: 0 } }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  lineHeight: "23.4px",
                  width: { xs: "100%", md: "99%" },
                  color: "#595959",
                  mt: 1,
                  textAlign: { xs: "center", md: "left" }
                }}
              >
                Choose a complaint category to help us direct your complaint to
                the right channel.
              </Typography>
            </Box>

            {/* Cards Container */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                mt: 2,
                gap: 4
              }}
            >
              {accountTypes.slice(0, 2).map((account) => (
                <AccountTypeCard
                  key={account.value}
                  value={account.value}
                  label={account.label}
                  image={account.image}
                  selectedAccountType={selectedAccountType}
                  onChange={handleSelection}
                />
              ))}

              {/* Third Card Container */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  mx: 10
                }}
              >
                <AccountTypeCard
                  value={accountTypes[2].value}
                  label={accountTypes[2].label}
                  image={accountTypes[2].image}
                  selectedAccountType={selectedAccountType}
                  onChange={handleSelection}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" }
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "270px",
                height: "48px",
                mt: { xs: 6, md: 3 },
                backgroundColor: "#038F3E",
                borderRadius: "16px",
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                textTransform: "capitalize",
                "&:hover": { backgroundColor: "#027833" }
              }}
              onClick={handleSubmit}
              disabled={!selectedAccountType}
            >
              Save & Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

// Keep prop types the same

export default AccountType;

AccountTypeCard.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  selectedAccountType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
