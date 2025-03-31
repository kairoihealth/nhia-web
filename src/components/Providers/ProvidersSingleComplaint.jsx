import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ProvidersSingleComplaint = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state;
  console.log(data.complaint.id);

  const handleCompliant = () => {
    navigate(`/provider/complaint/${data?.complaint.complaint_no}/thread`);
  };

  return (
    <Box>
      <Box sx={{ px: 2 }}>
        <Box sx={{ mt: 2 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "32.4px",
              color: "#1B1C1E"
            }}
          >
            Complaints
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "32.4px",
              color: "#111827"
            }}
          >
            KH/023/45 - Access to services
          </Typography>
        </Box>

        {/*Complainants Details*/}
        <Box sx={{ mt: 6 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "32.4px",
              color: "#038F3E"
            }}
          >
            Complainant&apos;s Details
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              gap: 2,
              mt: 4,
              px: 2
            }}
          >
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                Complainant&apos;s Name
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                Gabriella
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                Complainant&apos;s Address
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                H23 dolphin estate
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                Complainant&apos;s Email Address
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                Gabriella@gmail.com
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                Complainant&apos;s Phone Number
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                1234567890000
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                HMO of Complaint
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                enter NHIA number/code
              </Typography>
            </Box>
          </Box>
        </Box>

        {/*Complaint Details*/}
        <Box sx={{ mt: 6 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "32.4px",
              color: "#038F3E"
            }}
          >
            Complaints Details
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              gap: 2,
              mt: 4,
              px: 2
            }}
          >
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                Date of Incident
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                12/04/2024
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                Time of Incident
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                11:56AM
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                Date Reported
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                14/04/2024
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                NHIA Programme
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%"
                }}
              >
                Family Plan
              </Typography>
            </Box>
          </Box>
        </Box>

        {/*Button*/}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              backgroundColor: "#038F3E",
              color: "#FFFFFF",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "24px",
              textTransform: "capitalize",
              padding: "12px 24px",
              borderRadius: "8px",
              mt: 8,
              mb: 6
            }}
            onClick={handleCompliant}
          >
            Resolve Complaints
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProvidersSingleComplaint;
