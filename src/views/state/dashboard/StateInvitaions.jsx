import { Box, Typography, CircularProgress, Button } from "@mui/material";
import ReusableTable from "../../../shared/Table";
import SearchFilter from "../../../shared/SearchAndFilter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getInvitations } from "../../../services/general";
import { getUsers } from "../../../services/central";

const InvitationsByState = () => {
  const navigate = useNavigate();
  const stateId = localStorage.getItem("stateId");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const {
    data: users,
    isLoading: isUsersLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", page, pageSize, filter],
    queryFn: () =>
      getUsers({
        page,
        pageSize,
        search: searchTerm,
        role: filter,
        // state: stateId,
      }),
  });
  console.log(users, "users");
  // const handleFilter = async (roleFilter = "") => {
  //   setIsLoading(true);
  //   const params = {
  //     page: 1,
  //     pageSize: 10,
  //     search: searchTerm,
  //     role: roleFilter,
  //   };
  //   const u = await getUsers(params);
  //   setFilteredUsers(u || []);
  //   setIsLoading(false);
  // };

  const filterOptions = [
    { value: "", label: "All" },
    { value: "Provider", label: "Providers" },
    { value: "HMO", label: "HMO" },
  ];

  const handleAddUser = () => {
    navigate(`add-policy-user`);
  };

  // Define table columns dynamically based on activeTab
  const getColumns = () => {
    return [
      { label: "Name", field: "name", align: "center" },
      { label: "Date added", field: "created_at", align: "center" },
      // { label: "ID", field: "id", align: "center" },
      { label: "Email", field: "email", align: "center" },
      { label: "Type", field: "type", align: "center" },
    ];
  };

  const transformedRows =
    (filteredUsers?.results?.length ? filteredUsers : users)?.results
      ?.filter(
        (u) =>
          (u.role === "Provider" || u.role === "HMO") 
        // &&
        //   (u?.state?.id === stateId ||
        //     u?.hmo?.state?.id === stateId ||
        //     u?.provider?.state?.id === stateId),
      )
      ?.map((user) => ({
        name: `${user?.provider?.name || user?.hmo?.name}`.trim(),
        created_at: new Date(user.created_at).toLocaleDateString(),
        id: user.id,
        email: user.email,
        type: user.role,
        status: user.verified ? "active" : "request sent",
      })) || [];

  console.log(filteredUsers, users, "filteredUsers");
  if (isUsersLoading) {
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
          py: 3,
          backgroundColor: "#FAFAFA",
          //   height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "28px",
              color: "#101828",
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
              "&:hover": { backgroundColor: "#027A3B" },
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
            onSearchChange={(e) => {
              if (e.target.value === "") {
                refetch();
              }
              setSearchTerm(e.target.value);
            }}
            filterValue={filter}
            onFilterChange={(e) => {
              setFilter(e.target.value);
              if (e.target.value === "") {
                refetch();
              }
              // setPageSize(10);
              setPage(1);
              // handleFilter(e.target.value);
            }}
            filterOptions={filterOptions}
            handleSearch={() => {
              setFilteredUsers([]);
              refetch();
            }}
            isLoading={isUsersLoading}
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
          totalPages={users?.total_pages}
          page={page}
          setPage={(page) => {
            setPage(page);
          }}
          pageSize={pageSize}
          setPageSize={(pageSize) => {
            setPageSize(pageSize);
          }}
        />
      </Box>
    </Box>
  );
};

export default InvitationsByState;
