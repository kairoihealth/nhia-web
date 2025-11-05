/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Typography,
  Card,
  CircularProgress,
  Stack,
  Button,
} from "@mui/material";
import ReusableTable from "../../../shared/Table";
// import DashboardLayout from "../../../shared/DashboardLayout";
import ArrowRightAltTwoToneIcon from "@mui/icons-material/ArrowRightAltTwoTone";
import { useNavigate } from "react-router-dom";

import PieChart from "../../../shared/PieChart";
// import { pieColor } from "../../../mock/chartData";
import BarChart from "../../../shared/BarChart";
import LineChart from "../../../shared/LineChart";
import { barOptions, lineOptions, options } from "../../../utils/config";
import GaugeChart from "../../../shared/SofaChart";
import {
  getComplaints,
  getComplaintSatisfactionScores,
  getComplaintStats,
  getComplaintTrends,
} from "../../../services/general";
import { useQuery } from "@tanstack/react-query";
import { getInitials, truncateDay } from "../../../utils/general";
import { useMemo } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const initialFilters = {
  status: "",
  trend: "current_week_trends",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const filterButtonRef = useRef(null);
  const popoverRef = useRef(null);

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
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintScores"],
    queryFn: () => getComplaintSatisfactionScores({}),
  });

  const {
    data: complaintStats,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintStats"],
    queryFn: () => getComplaintStats({}),
  });

  const {
    data: complaintTrends,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["complaintTrends"],
    queryFn: () => getComplaintTrends({}),
  });

  const handleFilterClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isFilterOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

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
      complaintTrends?.[filters.trend]?.map((trend) =>
        trend.day
          ? truncateDay(trend.day)
          : trend?.state__name || trend?.complaint_against
      ) || [],
    datasets: [
      {
        label: "Total Complaints",
        data:
          complaintTrends?.[filters.trend]?.map((trend) => trend.total) || [],
        fill: false,
        borderColor: "#18A0FB",
        tension: 0.1,
      },
    ],
  };

  const getColumns = () => [
    { label: "Date", field: "created_at", align: "center" },
    { label: "Complainant", field: "name", align: "center" },
    { label: "Complaint no", field: "complaint_no", align: "center" },
    { label: "Complaint type", field: "type", align: "center" },
    { label: "Location", field: "location", align: "center" },
  ];

  const transformedRows =
    complaints?.results?.map((user) => ({
      created_at: new Date(user.created_at).toLocaleDateString(),
      name: `${user.firstname || "-"} ${user.lastname || "-"}`.trim(),
      complaint_no: user.case_id,
      type: user.complaint_type,
      location: user?.state?.name,
      id: user.id,
      status: user.status,
    })) || [];

  const handleViewClick = (row) => {
    alert("View clicked for:", row);
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
                Complaint Volume
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
                  display: "flex",
                  alignItem: "center",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#038F3E",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/hmo/complaints")}
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
              // height: "313px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                mb: 2,
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

              <Box sx={{ position: "relative" }}>
                <Box
                  ref={filterButtonRef}
                  onClick={handleFilterClick}
                  sx={{
                    display: "flex",
                    gap: 1,
                    borderRadius: "4px",
                    border: "1px solid #F2F4F7",
                    backgroundColor: "#F2F4F7",
                    p: 1,
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "21.6px",
                      color: "#64748B",
                    }}
                  >
                    Filter
                  </Typography>
                  <FiChevronDown size={20} style={{ color: "#64748B" }} />
                </Box>
                {isFilterOpen && (
                  <Box
                    ref={popoverRef}
                    sx={{
                      position: "absolute",
                      top: "calc(100% + 8px)", // Position below the button with a small gap
                      right: 0,
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                      p: 2,
                      zIndex: 10,
                      minWidth: "250px",
                      border: "1px solid #E0E0E0",
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      Filter Options
                    </Typography>
                    <Stack spacing={2}>
                      <select
                        id="trend-filter"
                        value={filters.trend}
                        name="trend"
                        onChange={handleFilterChange}
                        style={{
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      >
                        <option value="current_week_trends">
                          Current week
                        </option>
                        <option value="weekly_trends_over_time">
                          Weekly over time
                        </option>
                        <option value="state_trends_over_time">States</option>
                        <option value="complaint_against_trends_over_time">
                          Complaint against
                        </option>
                      </select>
                      <select
                        id="status-filter"
                        value={filters.status}
                        name="status"
                        onChange={handleFilterChange}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      >
                        <option value="">All Complaints</option>
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="escalated">Escalated</option>
                      </select>
                      <Button
                        variant="outlined"
                        onClick={handleResetFilters}
                        sx={{
                          mt: 2,
                          fontSize: "14px",
                          fontWeight: 500,
                          backgroundColor: "transparent",
                          border: "1px solid #038F3E",
                          color: "#038F3E",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#027A3B",
                            color: "#fff",
                          },
                        }}
                      >
                        Reset Filters
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Box>
            </Box>
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

export default Dashboard;
