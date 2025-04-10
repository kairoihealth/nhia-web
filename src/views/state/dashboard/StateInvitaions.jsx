import { Box, Typography, Button, CircularProgress } from "@mui/material";
import ReusableTable from "../../../shared/Table";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../../../shared/SearchAndFilter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/central";

const InvitationsByState = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("providers");

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

  const filterOptions = [
    { value: "providers", label: "Providers" },
    { value: "hmo", label: "HMO" }
  ];

  const handleAddUser = () => {
    navigate(`add-policy-user`);
  };

  // Define table columns dynamically based on activeTab
  const getColumns = () => {
    return [
      { label: "Name", field: "name", align: "center" },
      { label: "Date added", field: "date", align: "center" },
      // { label: "ID", field: "id", align: "center" },
      { label: "Email", field: "email", align: "center" },
      { label: "Type", field: "type", align: "center" }
    ];
  };

  const transformedRows =
    users?.results?.map((user) => ({
      name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      created_at: new Date(user.created_at).toLocaleDateString(),
      id: user.id,
      email: user.email,
      type: user.state
    })) || [];

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
            Providers & HMO
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
            placeholder="Search providers/HMO's"
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

export default InvitationsByState;
