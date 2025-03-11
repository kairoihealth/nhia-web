import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Card } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const stateData = {
  "north-west": [
    { name: "Kano", topPerformer: true, worstPerformer: false },
    { name: "Kaduna", topPerformer: false, worstPerformer: true },
    { name: "Katsina", topPerformer: false, worstPerformer: false },
    { name: "Kebbi", topPerformer: false, worstPerformer: false },
    { name: "Sokoto", topPerformer: false, worstPerformer: false },
    { name: "Zamfara", topPerformer: false, worstPerformer: false },
    { name: "Jigawa", topPerformer: false, worstPerformer: false }
  ],
  "north-central": [
    { name: "Benue", topPerformer: false, worstPerformer: true },
    { name: "Kogi", topPerformer: false, worstPerformer: false },
    { name: "Kwara", topPerformer: true, worstPerformer: false },
    { name: "Nasarawa", topPerformer: false, worstPerformer: false },
    { name: "Niger", topPerformer: false, worstPerformer: false },
    { name: "Plateau", topPerformer: false, worstPerformer: false },
    { name: "FCT", topPerformer: false, worstPerformer: false }
  ],
  "north-east": [
    { name: "Adamawa", topPerformer: true, worstPerformer: false },
    { name: "Bauchi", topPerformer: false, worstPerformer: true },
    { name: "Borno", topPerformer: false, worstPerformer: false },
    { name: "Gombe", topPerformer: false, worstPerformer: false },
    { name: "Taraba", topPerformer: false, worstPerformer: false },
    { name: "Yobe", topPerformer: false, worstPerformer: false }
  ],
  "south-west": [
    { name: "Ekiti", topPerformer: false, worstPerformer: false },
    { name: "Lagos", topPerformer: true, worstPerformer: false },
    { name: "Ogun", topPerformer: false, worstPerformer: false },
    { name: "Ondo", topPerformer: false, worstPerformer: true },
    { name: "Osun", topPerformer: false, worstPerformer: false },
    { name: "Oyo", topPerformer: false, worstPerformer: false }
  ],
  "south-south": [
    { name: "Akwa Ibom", topPerformer: false, worstPerformer: false },
    { name: "Bayelsa", topPerformer: false, worstPerformer: true },
    { name: "Cross River", topPerformer: false, worstPerformer: false },
    { name: "Delta", topPerformer: false, worstPerformer: false },
    { name: "Edo", topPerformer: true, worstPerformer: false },
    { name: "Rivers", topPerformer: false, worstPerformer: false }
  ],
  "south-east": [
    { name: "Abia", topPerformer: true, worstPerformer: false },
    { name: "Anambra", topPerformer: false, worstPerformer: false },
    { name: "Ebonyi", topPerformer: false, worstPerformer: true },
    { name: "Enugu", topPerformer: false, worstPerformer: false },
    { name: "Imo", topPerformer: false, worstPerformer: false }
  ]
};

const regionData = [
  {
    id: 1,
    region: "North West",
    slug: "north-west",
    total: "500",
    unresolved: "100"
  },
  {
    id: 2,
    region: "North Central",
    slug: "north-central",
    total: "50",
    unresolved: "10"
  },
  {
    id: 3,
    region: "North East",
    slug: "north-east",
    total: "100",
    unresolved: "20"
  },
  {
    id: 4,
    region: "South West",
    slug: "south-west",
    total: "200",
    unresolved: "40"
  },
  {
    id: 5,
    region: "South South",
    slug: "south-south",
    total: "350",
    unresolved: "70"
  },
  {
    id: 6,
    region: "South East",
    slug: "south-east",
    total: "400",
    unresolved: "80"
  }
];

const RegionStatesById = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const regionId = slug;
  const region = regionData.find((r) => r.slug === regionId);
  const states = stateData[regionId] || [];
  const getTopPerformer = () => {
    const topPerformers = states.filter((state) => state.topPerformer);
    return topPerformers.length > 0 ? topPerformers[0].name : "N/A";
  };

  const getWorstPerformer = () => {
    const worstPerformers = states.filter((state) => state.worstPerformer);
    return worstPerformers.length > 0 ? worstPerformers[0].name : "N/A";
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
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosOutlinedIcon
          sx={{ color: "#101828", width: 15, height: 15 }}
        />
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          {region?.region}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, p: 2, mt: 2 }}>
        {states.map((state, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "224px",
              height: "122px"
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                lineHeight: "26px",
                color: "#101828"
              }}
            >
              {state.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer"
              }}
              onClick={() => {}}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#071C42"
                }}
              >
                View Data
              </Typography>
              <ArrowForwardIosOutlinedIcon
                sx={{ color: "#071C42", width: 13, height: 13 }}
              />
            </Box>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 2, p: 2, mt: 2 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, width: "75%" }}>
          <Card
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
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467"
              }}
            >
              Total Complaints Received
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "48px" },
                fontWeight: 600,
                lineHeight: "50px",
                color: "#101828"
              }}
            >
              {region.total}
            </Typography>
            <Box></Box>
          </Card>
          <Card
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
          ></Card>
          <Card
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
          ></Card>
          <Card
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
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467"
              }}
            >
              Unresolved Complaints
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "48px" },
                fontWeight: 600,
                lineHeight: "50px",
                color: "#101828"
              }}
            >
              {region.unresolved}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer"
              }}
              onClick={() => navigate("/central-complaints")}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#071C42"
                }}
              >
                Respond to Complaints
              </Typography>
              <ArrowForwardIosOutlinedIcon
                sx={{ color: "#071C42", width: 13, height: 13 }}
              />
            </Box>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 3,
              p: 2,
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "313px",
              height: "135px"
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467"
              }}
            >
              Top performing state
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "40px" },
                fontWeight: 600,
                lineHeight: "72px",
                color: "#101828"
              }}
            >
              {getTopPerformer()}
            </Typography>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 3,
              p: 2,
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "313px",
              height: "135px"
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467"
              }}
            >
              Worst performing state
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "40px" },
                fontWeight: 600,
                lineHeight: "72px",
                color: "#101828"
              }}
            >
              {getWorstPerformer()}
            </Typography>
          </Card>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", width: "25%" }}>
          B
        </Box>
      </Box>
    </Box>
  );
};

export default RegionStatesById;
