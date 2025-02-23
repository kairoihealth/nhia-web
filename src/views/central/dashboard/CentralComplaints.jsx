import { useState } from "react";
// import { Helmet } from "react-helmet-async";
import { Box, Typography, Stack } from "@mui/material";
import { FiFilter } from "react-icons/fi";
import { TabButton } from "../../../shared/TabPanel";
import ReusableTable from "../../../shared/Table";
import { useNavigate } from "react-router-dom";

// CentralComplaints Component
const CentralComplaints = () => {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const buttonTextMapping = {
    all: "View Complaint",
    new: "Respond",
    act: "View Complaint",
    com: "View Resolution",
    esc: "View Complaints",
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleViewComplaint = (row) => {
    navigate(`/central-complaint/${row.complaint_no}`, { state: { complaint: row } })
  }

  const complaintsData = {
    all: [
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "High", location: "Ondo State", status: "Open" },
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "Mid", location: "Lagos State", status: "Pending" },
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "Low", location: "Kaduna State", status: "Resolved" },
    ],
    new: [
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "High", location: "Ondo State", timeLeft: "54 mins", status: "Pending" },
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "Quality of care", location: "Lagos State", timeLeft: "2 Hours 32 Mins", status: "Pending" },
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "Low", location: "Kaduna State", timeLeft: "7 Hours 59 mins", status: "Pending" },
    ],
    act: [
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "High", location: "Ondo State", status: "Open", },
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "Mid", location: "Lagos State", status: "Open", },
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "Low", location: "Kaduna State", status: "Open", },
    ],
    com: [
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "High", location: "Ondo State", status: "Open", },
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "Mid", location: "Lagos State", status: "Open", },
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "Low", location: "Kaduna State", status: "Open", },
    ],
    esc: [
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "High", location: "Ondo State", status: "Open", },
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "Mid", location: "Lagos State", status: "Open", },
      { date: "02/04/2023", name: "Adebayo Adekunle", complaint_no: "11023", priority: "Low", location: "Kaduna State", status: "Open", },
    ],
  };

  // Define table columns dynamically based on activeTab
  const getColumns = () => {
    if (activeTab === "new") {
      return [
        { label: "Date", field: "date", align: "center" },
        { label: "Complainant", field: "name", align: "center" },
        { label: "Complaint no", field: "complaint_no", align: "center" },
        { label: "Complaint priority", field: "priority", align: "center" },
        { label: "Location", field: "location", align: "center" },
      ];
    }
    if (activeTab === "act") {
      return [
        { label: "Date", field: "date", align: "center" },
        { label: "Complainant", field: "name", align: "center" },
        { label: "Complaint no", field: "complaint_no", align: "center" },
        { label: "Complaint priority", field: "priority", align: "center" },
        { label: "Location", field: "location", align: "center" },
      ];
    }
    if (activeTab === "com") {
      return [
        { label: "Date", field: "date", align: "center" },
        { label: "Complainant", field: "name", align: "center" },
        { label: "Complaint no", field: "complaint_no", align: "center" },
        { label: "Complaint priority", field: "priority", align: "center" },
        { label: "Location", field: "location", align: "center" },
      ];
    }
    if (activeTab === "esc") {
      return [
        { label: "Date", field: "date", align: "center" },
        { label: "Complainant", field: "name", align: "center" },
        { label: "Complaint no", field: "complaint_no", align: "center" },
        { label: "Complaint priority", field: "priority", align: "center" },
        { label: "Location", field: "location", align: "center" },
      ];
    }
    return [
      { label: "Date", field: "date", align: "center" },
      { label: "Complainant", field: "name", align: "center" },
      { label: "Complaint no", field: "complaint_no", align: "center" },
      { label: "Complaint priority", field: "priority", align: "center" },
      { label: "Location", field: "location", align: "center" },
    ];
  };

  // Render Table Rows
  const renderTableRows = () => {
    const data = complaintsData[activeTab];
    return data.map((complaint) => ({
      ...complaint,
      status: complaint.status,
    }));
  };

  return (
    <Box>
      {/* <Helmet>
        <title>State Complaints</title>
        <meta name="State Complaints" content=" " />
        <link rel="canonical" href="/" />
      </Helmet> */}
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
        <Stack direction= "row" sx={{justifyContent: "space-between", alignItems: "center", my: 3}}>
          <Stack direction= "row" spacing={2}>
            <TabButton tab="all" activeTab={activeTab} label="All Complaints" onClick={handleTabClick} />
            <TabButton tab="new" activeTab={activeTab} label="New Complaints" onClick={handleTabClick} />
            <TabButton tab="act" activeTab={activeTab} label="Active Complaints" onClick={handleTabClick} />
            <TabButton tab="com" activeTab={activeTab} label="Completed Complaints" onClick={handleTabClick} />
            <TabButton tab="esc" activeTab={activeTab} label="Escalated Complaints" onClick={handleTabClick} />
          </Stack>
          <Box
            // color="primary"
            sx={{display: "flex", gap: 1, borderRadius: "4px", border: "1px solid #F2F4F7", backgroundColor: "#F2F4F7", p: 1, cursor: "pointer" }}
            onClick={() => alert("Filter clicked")}
          >
            <FiFilter size={20} style={{color: "#64748B"}} />
            <Typography sx={{fontSize: "16px", fontWeight:500, lineHeight: "21.6px", color: "#64748B"}}>Filter</Typography>
          </Box>
        </Stack>

        {/* Table */}
        <ReusableTable
          columns={getColumns()}
          rows={renderTableRows()}
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