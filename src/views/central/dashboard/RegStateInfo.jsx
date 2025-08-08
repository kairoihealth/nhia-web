import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, CircularProgress, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import PieChart from "../../../shared/PieChart";
import { barOptions, lineOptions, options } from "../../../utils/config";
import LineChart from "../../../shared/LineChart";
import BarChart from "../../../shared/BarChart";
import { complaintRespondents } from "../../../mock/dashboard";
import { getSingleState } from "../../../services/settings";
import { useQuery } from "@tanstack/react-query";
import {
  getComplaintSatisfactionScores,
  getComplaintStats,
  getComplaintTrends,
  getComplaintTrendsByOrganisation,
} from "../../../services/general";
import { useMemo } from "react";
import { shortenDay } from "../../../utils/general";

const stateData = {
  "north-west": [
    {
      name: "Kano",
      slug: "kano",
      totalComplaints: 500,
      resolved: 450,
      satisfaction: 85,
      topPerformer: true,
      worstPerformer: false,
    },
    // ... other states
  ],
  // ... other regions
};
const RegStateInfo = () => {
  const { slug, stateId } = useParams();
  const navigate = useNavigate();

  // Find state data using slug
  const regionStates = stateData[slug] || [];
  // const state = regionStates.find((s) => s.slug === stateId);

  const {
    data: state,
    isLoading: isLoadingState,
    isError,
    error,
  } = useQuery({
    queryKey: ["state"],
    queryFn: () => getSingleState(stateId),
  });

  const {
    data: complaintStats,
    isLoading: isLoadingStats,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintStats"],
    queryFn: () => getComplaintStats({ state_id: stateId }),
  });

  const {
    data: complaintTrends,
    isLoading: isLoadingTrends,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintTrends"],
    queryFn: () => getComplaintTrends({ state_id: stateId }),
  });

  const {
    data: complaintTrendsByOrganisation,
    isLoading: isLoadingTrendsByOrganisation,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintTrendsByOrganisation"],
    queryFn: () => getComplaintTrendsByOrganisation({ state_id: stateId }),
  });

  const {
    data: complaintScores,
    isLoading: isLoadingScores,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintScores"],
    queryFn: () => getComplaintSatisfactionScores({ state_id: stateId }),
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

  if (
    isLoadingState ||
    isLoadingScores ||
    isLoadingStats ||
    isLoadingTrends ||
    isLoadingTrendsByOrganisation
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

  if (!state) return <div>State not found</div>;

  return (
    <Box sx={{ p: 2 }}>
      {/* Navigation Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          mb: 4,
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosOutlinedIcon
          sx={{ color: "#101828", width: 15, height: 15 }}
        />
        <Typography variant="h5">{state.name}</Typography>
      </Box>

      {/* State Statistics */}

      <Box sx={{ display: "flex", gap: 4 }}>
        <Box>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                p: 2,
                alignItems: "flex-start",
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
                Total Complaints Received
              </Typography>
              <Typography
                sx={{
                  fontSize: "48px",
                  fontWeight: 600,
                  lineHeight: "72px",
                  color: "#20201E",
                }}
              >
                {complaintStats?.total}
              </Typography>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                p: 2,
                alignItems: "flex-start",
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
                Complaints Status
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", px: 10 }}>
                <PieChart
                  title="Pie Chart Example"
                  data={pieStatusData}
                  options={options}
                />
              </Box>
              <Box sx={{ display: "flex" }}>
                {filteredPieStatus.map((t) => (
                  <Box
                    key={t.id}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
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
          </Box>

          <Box sx={{ display: "flex", my: 3, gap: 3 }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.2,
                p: 1,
                alignItems: "flex-start",
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
                gap: 0.5,
                p: 2,
                alignItems: "flex-start",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                width: "360px",
                height: "239px",
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
                Complaint Trends
              </Typography>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <LineChart
                  title="Line Chart Example"
                  data={lineData}
                  options={lineOptions}
                  height="180px"
                />
              </Box>
            </Card>
          </Box>
        </Box>
        <Box>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              p: 2,
              alignItems: "flex-start",
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "360px",
              height: "451px",
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
              Most Complaints Respondents
            </Typography>
            {complaintTrendsByOrganisation?.HMO?.organisations?.map((t) => (
              <Box
                key={t.id}
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "21.6px",
                    color: "#111827",
                  }}
                >
                  {t.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "16.94px",
                      color: "#000000",
                    }}
                  >
                    {t.count} Complaints
                  </Typography>
                  {/* <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "16.94px",
                      color: "#000000",
                    }}
                  >
                    &bull; {t.reason}
                  </Typography> */}
                </Box>
              </Box>
            ))}
            {complaintTrendsByOrganisation?.Provider?.organisations?.map(
              (t) => (
                <Box
                  key={t.id}
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "21.6px",
                      color: "#111827",
                    }}
                  >
                    {t.name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "16.94px",
                        color: "#000000",
                      }}
                    >
                      {t.count} Complaints
                    </Typography>
                    {/* <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "16.94px",
                      color: "#000000",
                    }}
                  >
                    &bull; {t.reason}
                  </Typography> */}
                  </Box>
                </Box>
              )
            )}
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default RegStateInfo;
