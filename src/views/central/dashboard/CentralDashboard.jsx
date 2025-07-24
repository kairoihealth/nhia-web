/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, Card, CircularProgress } from "@mui/material";
import ReusableTable from "../../../shared/Table";
import ArrowRightAltTwoToneIcon from "@mui/icons-material/ArrowRightAltTwoTone";
import { useNavigate } from "react-router-dom";
import LineChart from "../../../shared/LineChart";
import { barOptions, lineOptions, options } from "../../../utils/config";
import BarChart from "../../../shared/BarChart";
import PieChart from "../../../shared/PieChart";
import { useQuery } from "@tanstack/react-query";
import {
  getComplaintSatisfactionScores,
  getComplaintStats,
  getComplaintTrends,
  getComplaintTrendsByOrganisation,
  getNewComplaints,
} from "../../../services/general";
import { useMemo } from "react";
import { getInitials, shortenDay } from "../../../utils/general";

const CentralDashboard = () => {
  const navigate = useNavigate();

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
  const {
    data: escalatedComplaints,
    isLoading: isLoadingEscalatedComplaints,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["escalatedComplaints"],
    queryFn: () => getNewComplaints({ status: "escalated" }),
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

  const {
    data: complaintTrendsByOrganisation,
    isLoading: isLoadingTrendsByOrganisation,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintTrendsByOrganisation"],
    queryFn: () => getComplaintTrendsByOrganisation({}),
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
      complaintStats?.regions?.map((region) =>
        getInitials(region.state__region__name)
      ) || [],
    datasets: [
      {
        label: "Volume",
        data: complaintStats?.regions?.map((region) => region.total) || [],
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

  const columns = [
    // { label: "ID", field: "id", align: "center" },
    {
      label: "Date",
      field: "created_at",
      format: (value) => new Date(value).toLocaleDateString(),
    },
    { label: "Complainant", field: "name" },
    { label: "Complaint No", field: "complaint_no" },
    { label: "Complaint Category", field: "complaint_against" },
  ];

  const transformedRows =
    complaints?.results?.map((user) => ({
      created_at: new Date(user.created_at).toLocaleDateString(),
      name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      complaint_no: user.case_id,
      complaint_against: user.complaint_against,
      id: user.id,
      status: user.status,
    })) || [];

  const handleViewComplaint = (row) => {
    navigate(`/admin/complaint/${row.complaint_no}`, {
      state: { complaint: row?.id },
    });
  };

  if (
    isLoading ||
    isLoadingScores ||
    isLoadingStats ||
    isLoadingTrends ||
    isLoadingTrendsByOrganisation ||
    isLoadingEscalatedComplaints
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
                {complaintScores?.total_complaints || 0}
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
              <Box sx={{ display: "flex", px: 4, justifySelf: "center" }}>
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
                Regional Complaints
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
                gap: 2,
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
                Escalated Complaints
              </Typography>
              <Typography
                sx={{
                  fontSize: "48px",
                  fontWeight: 600,
                  lineHeight: "72px",
                  color: "#20201E",
                }}
              >
                {escalatedComplaints?.total}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#071C42",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/admin/complaints")}
              >
                View Complaints{" "}
                <ArrowRightAltTwoToneIcon sx={{ color: "#071C42" }} />
              </Typography>
            </Card>
          </Box>

          {/* Escalated Complaints Table */}
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "21.6px",
                  color: "#038F3E",
                  mb: 2,
                }}
              >
                New Complaints
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#071C42",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/admin/complaints")}
              >
                View Complaints{" "}
                <ArrowRightAltTwoToneIcon sx={{ color: "#038F3E" }} />
              </Typography>
            </Box>
            <ReusableTable
              columns={columns}
              rows={transformedRows}
              onViewClick={handleViewComplaint}
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
              Most Complaints respondents
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
              }}
            >
              Complaint Trends
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

export default CentralDashboard;
