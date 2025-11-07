import { Box, Typography } from "@mui/material";
import "react-phone-input-2/lib/style.css";
import PropTypes from "prop-types";
import { ArrowBack } from "@mui/icons-material";
import EmailVerified from "../../../assets/check-icon.png";
import { useNavigate } from "react-router-dom";

const SubmissionStatus = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          backgroundColor: { xs: "#FFFFFF", md: "#038F3E" },
          minHeight: "100dvh",
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
                width: { xs: "400px", md: "720px" },
                backgroundColor: "#fff",
                padding: "4rem 2rem",
                margin: { xs: 0, md: "2rem" },
                borderRadius: "8px",
              }}
            >
              <img
                src={EmailVerified}
                alt="Logo"
                style={{ display: "block", margin: "0 auto 2rem" }}
              />
              <Typography
                align="center"
                sx={{
                  fontSize: "30px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  color: "#038F3E",
                  margin: "1rem 0 1.2rem",
                }}
              >
                Successful submission
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  color: "#595959",
                  my: 4,
                  maxWidth: "350px",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                Your complaint has been successfully submitted. A mail and SMS
                containing your Case ID has been sent to you.
              </Typography>

              <Box
                flex={1}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 1,
                  marginTop: "60px",
                }}
              >
                <Typography
                  sx={{
                    color: "#475467",
                    fontSize: "14px",
                    fontWeight: 200,
                    lineHeight: "24px",
                  }}
                >
                  Didn’t receive the email?
                </Typography>
                <button
                  style={{
                    color: "#038F3E",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  Click to resend
                </button>
              </Box>
              <Box
                flex={1}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 1,
                  marginTop: "40px",
                }}
              >
                <button
                  style={{
                    color: "#475467",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                  onClick={() => navigate("/")}
                >
                  <ArrowBack />
                  Back to Home
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SubmissionStatus;

SubmissionStatus.propTypes = {
  firstInfo: PropTypes.object,
  setFirstInfo: PropTypes.func.isRequired,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  btn: PropTypes.any,
};
