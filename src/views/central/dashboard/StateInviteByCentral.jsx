import { Box, Typography, Button, CircularProgress } from "@mui/material";
import ReusableTable from "../../../shared/Table";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../../../shared/SearchAndFilter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/central";

const StateInviteByCentral = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("states");

  const filterOptions = [
    { value: "states", label: "States" },
    { value: "regions", label: "Regions" }
  ];

  const {
    data: users,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ page: 1, pageSize: 10 })
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
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
          color: "red"
        }}
      >
        <Typography>Error: {error.message}</Typography>
      </Box>
    );
  }

  const handleAddUser = () => {
    navigate(`add-user`);
  };

  // Define table columns dynamically based on activeTab
  const getColumns = () => {
    return [
      { label: "Name", field: "name", align: "center" },
      { label: "Date added", field: "created_at", align: "center" },
      { label: "Email", field: "email", align: "center" },
      { label: "Location", field: "state", align: "center" }
    ];
  };

  const transformedRows =
    users?.results?.map((user) => ({
      name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      created_at: new Date(user.created_at).toLocaleDateString(),
      id: user.id,
      email: user.email,
      state: user?.state?.name,
      status: user.verified === true ? "active" : "pending"
    })) || [];

  // console.log("Transformed Rows (Before Render):", transformedRows);

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
          rows={transformedRows}
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
