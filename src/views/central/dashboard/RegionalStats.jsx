import { useNavigate } from "react-router-dom";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { getRegions } from "../../../services/settings";
import { useQuery } from "@tanstack/react-query";

const RegionalStats = () => {
  const navigate = useNavigate();

  const {
    data: regions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegions({}),
  });

  const handleBack = () => {
    navigate(-1);
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

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "red",
        }}
      >
        <Typography>Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          p: 1,
        }}
        onClick={handleBack}
      >
        <ArrowBackIosOutlinedIcon
          sx={{ color: "#101828", width: 15, height: 15 }}
        />
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "18px",
            color: "#101828",
          }}
        >
          Region
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6, p: 1, mt: 2 }}>
        {regions?.results?.map((region, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 3,
              p: 2,
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "313px",
              height: "209px",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "48px" },
                fontWeight: 600,
                lineHeight: "50px",
              }}
            >
              {region.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
              }}
              onClick={() => navigate(`/admin/regional-stats/${region.id}`)}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#071C42",
                }}
              >
                View Region
              </Typography>
              <ArrowForwardIosOutlinedIcon
                sx={{ color: "#071C42", width: 13, height: 13 }}
              />
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RegionalStats;
