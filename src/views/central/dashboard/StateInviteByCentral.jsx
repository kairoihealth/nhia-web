import { Box, Typography, Stack, Button } from "@mui/material";
import { FiFilter } from "react-icons/fi";
import ReusableTable from "../../../shared/Table";
import { useNavigate } from "react-router-dom";

const StateInviteByCentral = () => {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate(`add-user`);
  };

  const complaintsData = [
    {
      date: "02/04/2023",
      name: "Adebayo Adekunle",
      complaint_no: "11023",
      location: "Ondo State",
      status: "Active"
    },
    {
      date: "02/04/2023",
      name: "Adebayo Adekunle",
      complaint_no: "11023",
      location: "Lagos State",
      status: "Active"
    },
    {
      date: "02/04/2023",
      name: "Adebayo Adekunle",
      complaint_no: "11023",
      location: "Kaduna State",
      status: "Request sent"
    }
  ];

  // Define table columns dynamically based on activeTab
  const getColumns = () => {
    return [
      { label: "Name", field: "name", align: "center" },
      { label: "Date added", field: "date", align: "center" },
      { label: "ID", field: "complaint_no", align: "center" },
      { label: "Location", field: "location", align: "center" }
      //   { label: "Status", field: "priority", align: "center" }
    ];
  };

  // Render Table Rows
  const renderTableRows = () => {
    const data = complaintsData;
    return data.map((complaint) => ({
      ...complaint,
      status: complaint.status
    }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 1,
          backgroundColor: "#FAFAFA",
          height: "100vh",
          overflowY: "auto"
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" gutterBottom>
            State Invites
          </Typography>
          <Button
            variant="contained"
            size="medium"
            onClick={handleAddUser}
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "21.6px",
              borderRadius: "8px",
              backgroundColor: "#038F3E",
              color: "#FFFFFF",
              py: "12px",
              px: "23px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#027A3B" }
            }}
          >
            Send Invitation
          </Button>
        </Box>

        {/* Tabs and Filter Button */}
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center", my: 3 }}
        >
          <Box
            // color="primary"
            sx={{
              display: "flex",
              gap: 1,
              borderRadius: "4px",
              border: "1px solid #F2F4F7",
              backgroundColor: "#F2F4F7",
              p: 1,
              cursor: "pointer"
            }}
            onClick={() => alert("Filter clicked")}
          >
            <FiFilter size={20} style={{ color: "#64748B" }} />
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "21.6px",
                color: "#64748B"
              }}
            >
              Filter
            </Typography>
          </Box>
        </Stack>

        {/* Table */}
        <ReusableTable
          columns={getColumns()}
          rows={renderTableRows()}
          //   onViewClick={handleViewComplaint}
          showActions={false}
          showStatus={true}
          statusLabel={"Status"}
          pagination={true}
          headerBackgroundColor="#20201E"
        />
      </Box>
    </Box>
  );
};

export default StateInviteByCentral;
