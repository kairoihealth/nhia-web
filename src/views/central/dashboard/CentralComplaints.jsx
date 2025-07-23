import { useState } from "react";
// import { Helmet } from "react-helmet-async";
import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import { TabButton } from "../../../shared/TabPanel";
import ReusableTable from "../../../shared/Table";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getComplaints } from "../../../services/general";

// CentralComplaints Component
const CentralComplaints = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const {
    data: complaints,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["complaints"],
    queryFn: () => getComplaints({ page: 1, pageSize: 10 }),
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
      name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      complaint_no: user.case_id,
      type: user.complaint_type,
      location: user?.state?.name,
      id: user.id,
      status: user.status,
    })) || [];

  const filteredRows = transformedRows.filter((row) => {
    if (activeTab === "new") return row.status === "pending";
    if (activeTab === "act") return row.status === "active";
    if (activeTab === "com") return row.status === "closed";
    if (activeTab === "esc") return row.status === "escalated";
    return true;
  });

  const handleViewComplaint = (row) => {
    navigate(`/admin/complaint/${row.complaint_no}`, {
      state: { complaint: row?.id },
    });
  };
  const buttonTextMapping = {
    all: "View Complaint",
    new: "View Complaint",
    act: "View Complaint",
    com: "View Resolution",
    esc: "View Complaint",
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
          flexDirection: "column",
          p: 1,
          backgroundColor: "#FAFAFA",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Typography variant="h5" gutterBottom>
          Complaints Received
        </Typography>

        {/* Tabs and Filter Button */}
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center", my: 3 }}
        >
          <Stack direction="row" spacing={2}>
            <TabButton
              tab="all"
              activeTab={activeTab}
              label="All Complaints"
              onClick={handleTabClick}
            />
            <TabButton
              tab="new"
              activeTab={activeTab}
              label="New Complaints"
              onClick={handleTabClick}
            />
            <TabButton
              tab="act"
              activeTab={activeTab}
              label="Active Complaints"
              onClick={handleTabClick}
            />
            <TabButton
              tab="com"
              activeTab={activeTab}
              label="Completed Complaints"
              onClick={handleTabClick}
            />
            <TabButton
              tab="esc"
              activeTab={activeTab}
              label="Escalated Complaints"
              onClick={handleTabClick}
            />
          </Stack>
          {/* <Box
            // color="primary"
            sx={{
              display: "flex",
              gap: 1,
              borderRadius: "4px",
              border: "1px solid #F2F4F7",
              backgroundColor: "#F2F4F7",
              p: 1,
              cursor: "pointer",
            }}
            onClick={() => alert("Filter clicked")}
          >
            <FiFilter size={20} style={{ color: "#64748B" }} />
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
          </Box> */}
        </Stack>

        {/* Table */}
        <ReusableTable
          columns={getColumns()}
          rows={filteredRows}
          onViewClick={handleViewComplaint}
          showActions={true}
          showStatus={true}
          pagination={true}
          headerBackgroundColor="#20201E"
          actionButtonText={buttonTextMapping[activeTab]}
        />
      </Box>
    </Box>
  );
};

export default CentralComplaints;
