import { Box, Typography, Button } from "@mui/material";
import ReusableTable from "../../../shared/Table";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../../../shared/SearchAndFilter";
import { useState } from "react";

const StateInviteByCentral = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("states");

  const filterOptions = [
    { value: "states", label: "States" },
    { value: "regions", label: "Regions" }
  ];

  const handleAddUser = () => {
    navigate(`add-user`);
  };

  const stateData = [
    {
      date: "02/04/2023",
      name: "Adebayo Adekunle",
      id: "11023",
      location: "Ondo State",
      status: "Active"
    },
    {
      date: "02/04/2023",
      name: "Adebayo Adekunle",
      id: "11023",
      location: "Lagos State",
      status: "Active"
    },
    {
      date: "02/04/2023",
      name: "Adebayo Adekunle",
      id: "11023",
      location: "Kaduna State",
      status: "Request sent"
    }
  ];

  // Define table columns dynamically based on activeTab
  const getColumns = () => {
    return [
      { label: "Name", field: "name", align: "center" },
      { label: "Date added", field: "date", align: "center" },
      { label: "ID", field: "id", align: "center" },
      { label: "Location", field: "location", align: "center" }
      //   { label: "Status", field: "priority", align: "center" }
    ];
  };

  // Render Table Rows
  const renderTableRows = () => {
    const data = stateData;
    return data.map((t) => ({
      ...t,
      status: t.status
    }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 3,
          backgroundColor: "#FAFAFA",
          //   height: "100vh",
          overflowY: "auto"
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#101828"
            }}
            gutterBottom
          >
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

        {/* Search and Sort */}
        <Box sx={{ py: 4 }}>
          <SearchFilter
            placeholder="Search states"
            searchValue={searchTerm}
            width={"482px"}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            filterValue={filter}
            onFilterChange={(e) => setFilter(e.target.value)}
            filterOptions={filterOptions}
          />
        </Box>

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
