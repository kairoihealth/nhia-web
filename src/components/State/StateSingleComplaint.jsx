import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getSingleComplaint } from "../../services/general";
import WithAuthorization from "../auth/withAuthorization";

const StateSingleComplaintPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const slug = location?.state.complaint;

  const {
    data: complaint,
    isLoading,
    //  isError,
    //  error
  } = useQuery({
    queryKey: ["complaints", slug],
    queryFn: () => getSingleComplaint(slug),
  });

  const handleCompliant = () => {
    navigate(`/stateadmin/complaint/${complaint?.id}/thread`, {
      state: { thread: complaint?.id },
    });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ px: 2 }}>
        <Box sx={{ mt: 2 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "32.4px",
              color: "#1B1C1E",
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
              color: "#111827",
            }}
          >
            {complaint?.case_id || ""} - {complaint?.complaint_type || ""}
          </Typography>
        </Box>

        {/*Complainants Details*/}
        <Box sx={{ mt: 6 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              lineHeight: "32.4px",
              color: "#038F3E",
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
              px: 2,
            }}
          >
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
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
                  width: "60%",
                }}
              >
                {complaint?.firstname || "-"} {complaint?.lastname || "-"}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
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
                  width: "60%",
                }}
              >
                {complaint?.contact_address || "--"}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
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
                  width: "60%",
                }}
              >
                {complaint?.email || "--"}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
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
                  width: "60%",
                }}
              >
                {complaint?.phone || "--"}
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
              color: "#038F3E",
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
              px: 2,
            }}
          >
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
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
                  width: "60%",
                }}
              >
                {new Date(complaint?.incident_date).toLocaleDateString() ||
                  "--"}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
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
                  width: "60%",
                }}
              >
                {complaint?.incident_time || "--"}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
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
                  width: "60%",
                }}
              >
                {new Date(complaint?.created_at).toLocaleDateString() || "--"}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
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
                  width: "60%",
                }}
              >
                {complaint?.nhia_programme || "--"}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                Complaint Against
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                {complaint?.complaint_against || "--"}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                Name of Respondent
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                {complaint?.respondent ||
                  complaint?.provider?.name ||
                  complaint?.hmo?.name ||
                  "--"}
              </Typography>
            </Box>
            <Box flex={1} sx={{ display: "flex", gap: 2 }}>
              <Typography
                sx={{
                  color: "#595959",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                Type of Complaint
              </Typography>
              <Typography
                sx={{
                  color: "#1B1C1E",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: "24px",
                  width: "60%",
                }}
              >
                {complaint?.complaint_type || "--"}
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
              mb: 6,
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

const StateSingleComplaint = WithAuthorization(StateSingleComplaintPage, [
  "can_view_complaint_details",
  "can_respond_to_complaints",
]);

export default StateSingleComplaint;
