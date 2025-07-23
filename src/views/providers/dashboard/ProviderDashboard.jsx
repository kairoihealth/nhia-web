/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, Card, CircularProgress } from "@mui/material";
import ReusableTable from "../../../shared/Table";
import ArrowRightAltTwoToneIcon from "@mui/icons-material/ArrowRightAltTwoTone";
import { useNavigate } from "react-router-dom";
import PieChart from "../../../shared/PieChart";
import LineChart from "../../../shared/LineChart";
import { lineOptions, options } from "../../../utils/config";
import GaugeChart from "../../../shared/SofaChart";
import {
  getComplaints,
  getComplaintSatisfactionScores,
  getComplaintStats,
  getComplaintTrends,
} from "../../../services/general";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { shortenDay } from "../../../utils/general";

const ProviderDashboard = () => {
  const navigate = useNavigate();

  const {
    data: complaints,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["complaints"],
    queryFn: () => getComplaints({ page: 1, pageSize: 10 }),
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

  // const pieData = {
  //   labels: complaintStats?.status?.map((status) => status.status) || [],
  //   datasets: [
  //     {
  //       data: complaintStats?.status?.map((status) => status.total) || [],
  //       backgroundColor: ["#FFCC99", "#72F172", "#4B95DD", "#E75C5C"],
  //       borderColor: ["#FFCC99", "#72F172", "#4B95DD", "#E75C5C"],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const categoryColors = ["#66B3FF", "#F9AA33", "#CE88E5"];
  const filteredPieCategories = useMemo(
    () =>
      complaintStats?.complaint_type?.map((type, index) => ({
        ...type,
        color: categoryColors[index],
        title: type.complaint_type,
      })),
    [complaintStats?.complaint_type]
  );

  const pieCategoryData = {
    labels: filteredPieCategories?.map((type) => type.complaint_type) || [],
    datasets: [
      {
        data: filteredPieCategories?.map((type) => type.total) || [],
        backgroundColor: filteredPieCategories?.map((type) => type.color),
        borderColor: filteredPieCategories?.map((type) => type.color),
        borderWidth: 1,
      },
    ],
  };

  // const barData = {
  //   labels:
  //     complaintStats?.regions?.map((region) =>
  //       getInitials(region.state__region__name)
  //     ) || [],
  //   datasets: [
  //     {
  //       label: "Volume",
  //       data: complaintStats?.regions?.map((region) => region.total) || [],
  //       backgroundColor: ["#20201E"],
  //       borderColor: ["#20201E"],
  //       borderWidth: 1,
  //       barThickness: 15,
  //       borderRadius: 4,
  //     },
  //   ],
  // };

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

  console.log("complaintTrends", complaintStats);

  const getColumns = () => [
    { label: "Date", field: "created_at", align: "center" },
    { label: "Complainant", field: "name", align: "center" },
    { label: "Complaint no", field: "complaint_no", align: "center" },
    { label: "Complaint Category", field: "category", align: "center" },
    { label: "Priority Rating", field: "rating", align: "center" },
  ];

  const transformedRows =
    complaints?.results?.map((user) => ({
      created_at: new Date(user.created_at).toLocaleDateString(),
      name: `${user.firstname || "-"} ${user.lastname || "-"}`.trim(),
      complaint_no: user.case_id,
      category: user.complaint_type,
      rating: user?.priority_rating || "N/A",
      // location: user?.state?.name,
      id: user.id,
      status: user.status,
    })) || [];

  if (isLoading || isLoadingScores || isLoadingStats || isLoadingTrends) {
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

  const handleViewClick = (row) => {
    alert("View clicked for:", row);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mt: 2,
          gap: 4,
          px: 4,
        }}
      >
        {/*Left side*/}
        <Box sx={{ width: "100%" }}>
          {/* Top Cards */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 4,
              flexWrap: "wrap",
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
                {complaintScores?.total_complaints}
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
                {filteredPieStatus?.map((t) => (
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
                Category of Complaints
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", px: 10 }}>
                <PieChart
                  title="Pie Chart"
                  data={pieCategoryData}
                  options={options}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", px: 3 }}>
                {filteredPieCategories?.map((t) => (
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
                      }}
                    >
                      {t.title === "Service Delivery" ? "Services" : t.title}
                    </Typography>
                  </Box>
                ))}
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
                Compliance with Regulations
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
                <GaugeChart
                  value={complaintScores?.satisfaction_percentage || 0}
                />
              </Box>
            </Card>
          </Box>
          {/* Escalated Complaints Table */}
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  color: "#1B1C1E",
                  mb: 2,
                }}
              >
                Escalated Complaints
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#038F3E",
                  textDecoration: "underline",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    color: "#027A3B",
                  },
                }}
                onClick={() => navigate("/provider/complaints")}
              >
                View Complaints{" "}
                <ArrowRightAltTwoToneIcon sx={{ color: "#038F3E" }} />
              </Typography>
            </Box>

            <ReusableTable
              columns={getColumns()}
              rows={transformedRows}
              onViewClick={handleViewClick}
              showActions={false}
              showStatus={false}
            />
          </Box>
        </Box>

        {/*Right side*/}
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: 4,
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
              Frequency of Complaints
            </Typography>
            {complaintStats?.complaint_type?.map((t) => (
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
                  {t.complaint_type}
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
                    {t.total} Complaints
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "16.94px",
                      color: "#000000",
                    }}
                  >
                    &bull; {t.complaint_type}
                  </Typography>
                </Box>
              </Box>
            ))}
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
              height: "313px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#101828",
                px: 1,
              }}
            >
              Complaint Trend
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <LineChart
                title="Line Chart Example"
                data={lineData}
                options={lineOptions}
              />
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ProviderDashboard;
