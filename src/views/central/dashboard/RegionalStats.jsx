import { useNavigate } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const regionData = [
  { id: 1, region: "North West", slug: "north-west" },
  { id: 2, region: "North Central", slug: "north-central" },
  { id: 3, region: "North East", slug: "north-east" },
  { id: 4, region: "South West", slug: "south-west" },
  { id: 5, region: "South South", slug: "south-south" },
  { id: 6, region: "South East", slug: "south-east" }
];

const RegionalStats = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          p: 1
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
            color: "#101828"
          }}
        >
          Region
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6, p: 1, mt: 2 }}>
        {regionData.map((region) => (
          <Card
            key={region.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 3,
              p: 2,
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "313px",
              height: "209px"
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "48px" },
                fontWeight: 600,
                lineHeight: "50px"
              }}
            >
              {region.region}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer"
              }}
              onClick={() => navigate(`/central-regional-stats/${region.slug}`)}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#071C42"
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
