import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CircularProgress } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import PieChart from "../../../shared/PieChart";
import { barOptions, lineOptions, options } from "../../../utils/config";
import BarChart from "../../../shared/BarChart";
import GaugeChart from "../../../shared/SofaChart";
import LineChart from "../../../shared/LineChart";
import { useQuery } from "@tanstack/react-query";
import { getRegions, getStatesByRegion } from "../../../services/settings";
import {
  getComplaintSatisfactionScores,
  getComplaintStats,
  getComplaintTrends,
  getNewComplaints,
} from "../../../services/general";
import { useMemo } from "react";
import { shortenDay } from "../../../utils/general";

const stateData = {
  "north-west": [
    { name: "Kano", topPerformer: true, worstPerformer: false },
    { name: "Kaduna", topPerformer: false, worstPerformer: true },
    { name: "Katsina", topPerformer: false, worstPerformer: false },
    { name: "Kebbi", topPerformer: false, worstPerformer: false },
    { name: "Sokoto", topPerformer: false, worstPerformer: false },
    { name: "Zamfara", topPerformer: false, worstPerformer: false },
    { name: "Jigawa", topPerformer: false, worstPerformer: false },
  ],
  "north-central": [
    { name: "Benue", topPerformer: false, worstPerformer: true },
    { name: "Kogi", topPerformer: false, worstPerformer: false },
    { name: "Kwara", topPerformer: true, worstPerformer: false },
    { name: "Nasarawa", topPerformer: false, worstPerformer: false },
    { name: "Niger", topPerformer: false, worstPerformer: false },
    { name: "Plateau", topPerformer: false, worstPerformer: false },
    { name: "FCT", topPerformer: false, worstPerformer: false },
  ],
  "north-east": [
    { name: "Adamawa", topPerformer: true, worstPerformer: false },
    { name: "Bauchi", topPerformer: false, worstPerformer: true },
    { name: "Borno", topPerformer: false, worstPerformer: false },
    { name: "Gombe", topPerformer: false, worstPerformer: false },
    { name: "Taraba", topPerformer: false, worstPerformer: false },
    { name: "Yobe", topPerformer: false, worstPerformer: false },
  ],
  "south-west": [
    { name: "Ekiti", topPerformer: false, worstPerformer: false },
    { name: "Lagos", topPerformer: true, worstPerformer: false },
    { name: "Ogun", topPerformer: false, worstPerformer: false },
    { name: "Ondo", topPerformer: false, worstPerformer: true },
    { name: "Osun", topPerformer: false, worstPerformer: false },
    { name: "Oyo", topPerformer: false, worstPerformer: false },
  ],
  "south-south": [
    { name: "Akwa Ibom", topPerformer: false, worstPerformer: false },
    { name: "Bayelsa", topPerformer: false, worstPerformer: true },
    { name: "Cross River", topPerformer: false, worstPerformer: false },
    { name: "Delta", topPerformer: false, worstPerformer: false },
    { name: "Edo", topPerformer: true, worstPerformer: false },
    { name: "Rivers", topPerformer: false, worstPerformer: false },
  ],
  "south-east": [
    { name: "Abia", topPerformer: true, worstPerformer: false },
    { name: "Anambra", topPerformer: false, worstPerformer: false },
    { name: "Ebonyi", topPerformer: false, worstPerformer: true },
    { name: "Enugu", topPerformer: false, worstPerformer: false },
    { name: "Imo", topPerformer: false, worstPerformer: false },
  ],
};

const regionData = [
  {
    id: 1,
    region: "North West",
    slug: "north-west",
    total: "500",
    unresolved: "100",
  },
  {
    id: 2,
    region: "North Central",
    slug: "north-central",
    total: "50",
    unresolved: "10",
  },
  {
    id: 3,
    region: "North East",
    slug: "north-east",
    total: "100",
    unresolved: "20",
  },
  {
    id: 4,
    region: "South West",
    slug: "south-west",
    total: "200",
    unresolved: "40",
  },
  {
    id: 5,
    region: "South South",
    slug: "south-south",
    total: "350",
    unresolved: "70",
  },
  {
    id: 6,
    region: "South East",
    slug: "south-east",
    total: "400",
    unresolved: "80",
  },
];

const RegionStatesById = () => {
  const { slug: regionId } = useParams();
  const navigate = useNavigate();

  const region = regionData.find((r) => r.slug === regionId);
  const states = stateData[regionId] || [];

  const {
    data: complaints,
    isLoading: isLoadingComplaints,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaints"],
    queryFn: () => getNewComplaints({}),
  });

  const {
    data: regions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegions({}),
  });

  const {
    data: regionStates,
    isLoading: isLoadingRegionStates,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["regionStates"],
    queryFn: () => getStatesByRegion({ region: regionId }),
  });

  const {
    data: complaintStats,
    isLoading: isLoadingStats,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintStats"],
    queryFn: () => getComplaintStats({ region_id: regionId }),
  });

  const unresolvedComplaints = complaintStats?.status
    ?.filter((complaint) => complaint?.status !== "closed")
    ?.reduce((total, complaint) => total + complaint.total, 0);

  const {
    data: complaintTrends,
    isLoading: isLoadingTrends,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintTrends"],
    queryFn: () => getComplaintTrends({ region_id: regionId }),
  });

  const {
    data: complaintScores,
    isLoading: isLoadingScores,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintScores"],
    queryFn: () => getComplaintSatisfactionScores({ region_id: regionId }),
  });

  const pieStatusColors = [
    { status: "pending", color: "#FFCC99" },
    { status: "active", color: "#72F172" },
    { status: "closed", color: "#4B95DD" },
    { status: "escalated", color: "#E75C5C" },
  ];
  const filteredPieStatus = useMemo(
    () =>
      complaintStats?.status?.map((s) => {
        const colorObj = pieStatusColors.find((c) => c.status === s.status);
        return {
          ...s,
          color: colorObj ? colorObj.color : "#dddddd",
          title: s.status,
        };
      }),
    [complaintStats?.status]
  );

  const pieStatusData = {
    labels: filteredPieStatus?.map((s) => s.status) || [],
    datasets: [
      {
        data: filteredPieStatus?.map((s) => s.total) || [],
        backgroundColor: filteredPieStatus?.map((s) => s.color),
        borderColor: filteredPieStatus?.map((s) => s.color),
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels:
      complaintStats?.complaint_type?.map((region) => region.complaint_type) ||
      [],
    datasets: [
      {
        label: "Volume",
        data:
          complaintStats?.complaint_type?.map((region) => region.total) || [],
        backgroundColor: ["#20201E"],
        borderColor: ["#20201E"],
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 4,
      },
    ],
  };

  const lineData = {
    labels:
      complaintTrends?.current_week_trends?.map((trend) =>
        shortenDay(trend.date)
      ) || [],
    datasets: [
      {
        label: "Trend",
        data:
          complaintTrends?.current_week_trends?.map((trend) => trend.total) ||
          [],
        fill: false,
        borderColor: "#18A0FB",
        tension: 0.1,
      },
    ],
  };

  const getTopPerformer = () => {
    const topPerformers = states.filter((state) => state.topPerformer);
    return topPerformers.length > 0 ? topPerformers[0].name : "N/A";
  };

  const getWorstPerformer = () => {
    const worstPerformers = states.filter((state) => state.worstPerformer);
    return worstPerformers.length > 0 ? worstPerformers[0].name : "N/A";
  };

  if (
    isLoading ||
    isLoadingRegionStates ||
    isLoadingScores ||
    isLoadingStats ||
    isLoadingTrends ||
    isLoadingComplaints
  ) {
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
        {regionStates?.results?.map((state, index) => (
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
              height: "122px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 600,
                lineHeight: "26px",
                color: "#101828",
              }}
            >
              {state.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
              }}
              onClick={() =>
                navigate(
                  `/admin/regional-stats/${regionId}/${state.id
                    .toLowerCase()
                    .replace(/ /g, "-")}`
                )
              }
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#071C42",
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

      <Box sx={{ display: "flex", gap: 1, p: 2, mt: 2 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, width: "65%" }}>
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
              height: "209px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467",
              }}
            >
              Total Complaints Received
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "48px" },
                fontWeight: 600,
                lineHeight: "50px",
                color: "#101828",
              }}
            >
              {complaintStats?.total}
            </Typography>
            <Box></Box>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 0.5,
              p: 2,
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "313px",
              height: "209px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467",
              }}
              gutterBottom
            >
              Complaint Status
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", px: 10 }}>
              <PieChart
                title="Pie Chart Example"
                data={pieStatusData}
                options={options}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              {filteredPieStatus?.map((t, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: t.color,
                      borderRadius: "50%",
                      margin: "0 8px",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: "16px",
                      color: "#475467",
                      textTransform: "capitalize",
                    }}
                  >
                    {t.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 0.2,
              p: 1,
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "313px",
              height: "209px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467",
                p: 1,
              }}
              gutterBottom
            >
              Top Complaint Category
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <BarChart
                title="Bar Chart Example"
                data={barData}
                options={barOptions}
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
              height: "209px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467",
              }}
            >
              Unresolved Complaints
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "48px" },
                fontWeight: 600,
                lineHeight: "50px",
                color: "#101828",
              }}
            >
              {unresolvedComplaints || 0}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
              }}
              onClick={() => navigate("/admin/complaints")}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#071C42",
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
              height: "135px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467",
              }}
            >
              Top performing state
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "40px" },
                fontWeight: 600,
                lineHeight: "72px",
                color: "#101828",
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
              height: "135px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467",
              }}
            >
              Worst performing state
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "40px" },
                fontWeight: 600,
                lineHeight: "72px",
                color: "#101828",
              }}
            >
              {getWorstPerformer()}
            </Typography>
          </Card>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "35%",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 0.5,
              p: 2,
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "360px",
              height: "313px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#101828",
              }}
            >
              Complaints Trends
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <LineChart
                title="Line Chart Example"
                data={lineData}
                options={lineOptions}
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
              width: "361px",
              height: "273.65px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#475467",
              }}
              gutterBottom
            >
              Complaints Satisfaction
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", px: 5 }}>
              <GaugeChart
                value={complaintScores?.satisfaction_percentage || 0}
              />
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default RegionStatesById;
