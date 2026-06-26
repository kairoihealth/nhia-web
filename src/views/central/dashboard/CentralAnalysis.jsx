import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { FiArrowRight } from "react-icons/fi";
import PieChart from "../../../shared/PieChart";
import { barOptions, options } from "../../../utils/config";
import GaugeChart from "../../../shared/SofaChart";
import BarChart from "../../../shared/BarChart";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useNavigate } from "react-router-dom";
import {
  getComplaintSatisfactionScores,
  getComplaintStats,
  getComplaintTrends,
  getNewComplaints,
} from "../../../services/general";
import { useQuery } from "@tanstack/react-query";
import { getAllHmo, getAllProviders } from "../../../services/settings";
import { useMemo } from "react";

const CentralAnalysis = () => {
  const navigate = useNavigate();
  const handleRegionalStats = () => {
    navigate("/admin/regional-stats");
  };

  const {
    data: complaints,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["new-complaints"],
    queryFn: () =>
      getNewComplaints({ page: 1, pageSize: 5, status: "pending" }),
  });

  const { data: hmosData, isLoading: isLoadingHmos } = useQuery({
    queryKey: ["hmos"],
    queryFn: () => getAllHmo({ page: 1, pageSize: 100 }),
  });
  const { data: providersData, isLoading: isLoadingProviders } = useQuery({
    queryKey: ["providers"],
    queryFn: () => getAllProviders({ page: 1, pageSize: 100 }),
  });

  const {
    data: complaintScores,
    isLoading: isLoadingScores,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintScores"],
    queryFn: () => getComplaintSatisfactionScores({}),
  });

  const {
    data: complaintStats,
    isLoading: isLoadingStats,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintStats"],
    queryFn: () => getComplaintStats({}),
  });

  const {
    data: complaintTrends,
    isLoading: isLoadingTrends,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintTrends"],
    queryFn: () => getComplaintTrends({}),
  });

  const pieComplaintAgainstColors = [
    { complaint_against: "Enrollee", color: "#FA7A5D" },
    { complaint_against: "HMO", color: "#72F172" },
    { complaint_against: "NHIA", color: "#FCE500" },
    { complaint_against: "Provider", color: "#071C42" },
  ];
  const filteredPieComplaintAgainst = useMemo(
    () =>
      complaintStats?.complaint_against?.map((s) => {
        const colorObj = pieComplaintAgainstColors.find(
          (c) => c.complaint_against === s.complaint_against,
        );
        return {
          ...s,
          color: colorObj ? colorObj.color : "#dddddd",
          title: s.complaint_against,
        };
      }),
    [complaintStats?.complaint_against],
  );

  const pieComplaintAgainstData = {
    labels: filteredPieComplaintAgainst?.map((s) => s.status) || [],
    datasets: [
      {
        data: filteredPieComplaintAgainst?.map((s) => s.total) || [],
        backgroundColor: filteredPieComplaintAgainst?.map((s) => s.color),
        borderColor: filteredPieComplaintAgainst?.map((s) => s.color),
        borderWidth: 1,
      },
    ],
  };

  const pieComplaintByRegionColors = [
    { state__region__name: "North West", color: "#737CB7" },
    { state__region__name: "North Central", color: "#FA7A5D" },
    { state__region__name: "North East", color: "#95CC7B" },
    { state__region__name: "South West", color: "#2AC5F3" },
    { state__region__name: "South South", color: "#2CADB2" },
    { state__region__name: "South East", color: "#FCE500" },
  ];
  const filteredPieComplaintByRegion = useMemo(
    () =>
      complaintStats?.regions?.map((s) => {
        const colorObj = pieComplaintByRegionColors.find(
          (c) => c.state__region__name === s.state__region__name,
        );
        return {
          ...s,
          color: colorObj ? colorObj.color : "#dddddd",
          title: s.state__region__name,
        };
      }),
    [complaintStats?.region],
  );

  const pieComplaintByRegionData = {
    labels: filteredPieComplaintByRegion?.map((s) => s.status) || [],
    datasets: [
      {
        data: filteredPieComplaintByRegion?.map((s) => s.total) || [],
        backgroundColor: filteredPieComplaintByRegion?.map((s) => s.color),
        borderColor: filteredPieComplaintByRegion?.map((s) => s.color),
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels:
      complaintTrends?.state_trends_over_time?.map(
        (trend) => trend.state__name,
      ) || [],
    datasets: [
      {
        label: "Volume",
        data:
          complaintTrends?.state_trends_over_time?.map(
            (trend) => trend.total,
          ) || [],
        backgroundColor: ["#20201E"],
        borderColor: ["#20201E"],
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 4,
      },
    ],
  };

  if (
    isLoading ||
    isLoadingHmos ||
    isLoadingProviders ||
    isLoadingScores ||
    isLoadingStats ||
    isLoadingTrends
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
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
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
          Analysis
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
          onClick={handleRegionalStats}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "18.9px",
              color: "#071C42",
            }}
          >
            View Regional stats
          </Typography>
          <ArrowForwardIosOutlinedIcon
            sx={{ color: "#071C42", width: 13, height: 13 }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          width: "100%",
          gap: 4,
          mb: 4,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            p: 2,
            alignItems: "flex-start",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            minHeight: "209px",
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
            Registered HMO&apos;s
          </Typography>
          <Typography
            sx={{
              fontSize: "48px",
              fontWeight: 600,
              lineHeight: "72px",
              color: "#101828",
            }}
          >
            {hmosData?.total}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "18.9px",
                color: "#071C42",
                textDecoration: "underline",
              }}
              role="button"
              onClick={() => navigate("/admin/state/invite")}
            >
              View list
            </Typography>
            <FiArrowRight />
          </Box>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            p: 2,
            alignItems: "flex-start",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            minHeight: "209px",
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
            Registered HCF&apos;s
          </Typography>
          <Typography
            sx={{
              fontSize: "48px",
              fontWeight: 600,
              lineHeight: "72px",
              color: "#101828",
            }}
          >
            {providersData?.total}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "18.9px",
                color: "#071C42",
                textDecoration: "underline",
              }}
              role="button"
              onClick={() => navigate("/admin/state/invite")}
            >
              View list
            </Typography>
            <FiArrowRight />
          </Box>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 2,
            alignItems: "flex-start",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            minHeight: "209px",
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
            Complaints
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <PieChart
              title="Pie Chart Example"
              data={pieComplaintAgainstData}
              options={options}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
            }}
          >
            {filteredPieComplaintAgainst?.map((t, index) => (
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
                  }}
                >
                  {t.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" },
          width: "100%",
          gap: 4,
          mb: 4,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 2,
            alignItems: "flex-start",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            minHeight: "401px",
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
            Complaints volume by region
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <PieChart
              title="Pie Chart Example"
              data={pieComplaintByRegionData}
              options={options}
              width="236px"
              height="236px"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {filteredPieComplaintByRegion?.map((t, index) => (
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
            gap: 3,
            p: 2,
            alignItems: "flex-start",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            minHeight: "401px",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <GaugeChart value={complaintScores?.satisfaction_percentage || 0} />
          </Box>
        </Card>
      </Box>

      <Box
        sx={{
          width: "100%",
          gap: 4,
          mb: 4,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 2,
            alignItems: "flex-start",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            minHeight: "401px",
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
            Complaints volume
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              width: "100%",
              flexGrow: 1,
            }}
          >
            <BarChart
              title="Bar Chart Example"
              data={barData}
              options={barOptions}
              height="300px"
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default CentralAnalysis;
