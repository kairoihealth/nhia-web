import { useState } from "react";
// import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
// import { FiFilter } from "react-icons/fi";
import { TabButton } from "../../../shared/TabPanel";
import ReusableTable from "../../../shared/Table";
import { useNavigate } from "react-router-dom";
import { getComplaints } from "../../../services/general";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { FiFilter } from "react-icons/fi";
import { complaintCategories, complaintType } from "../../../mock/type";
import { useEffect } from "react";

const initialFilters = {
  type: "",
  category: "",
  status: "",
  start_date: "",
  end_date: "",
};

// HmoComplaints Component
const HmoComplaints = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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
    queryKey: ["complaints", filters, page],
    queryFn: () =>
      getComplaints({
        page,
        pageSize,
        // state_id: stateId,
        ...filters,
      }),
  });

  console.log(page, "pageee");
  const handleTabClick = (tab) => {
    // setActiveTab(tab);
    setFilters((prev) => ({ ...prev, status: tab }));
    setPage(1);
  };

  const handleFilterClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
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

  const handleViewComplaint = (row) => {
    navigate(`/hmo/complaint/${row.complaint_no}`, {
      state: { complaint: row?.id },
    });
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
              tab=""
              activeTab={filters.status}
              label="All Complaints"
              onClick={handleTabClick}
            />
            <TabButton
              tab="pending"
              activeTab={filters.status}
              label="New Complaints"
              onClick={handleTabClick}
            />
            <TabButton
              tab="active"
              activeTab={filters.status}
              label="Active Complaints"
              onClick={handleTabClick}
            />
            <TabButton
              tab="closed"
              activeTab={filters.status}
              label="Completed Complaints"
              onClick={handleTabClick}
            />
            <TabButton
              tab="escalated"
              activeTab={filters.status}
              label="Escalated Complaints"
              onClick={handleTabClick}
            />
          </Stack>
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

                  <select
                    id="type-filter"
                    value={filters.type}
                    name="type"
                    onChange={handleFilterChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">All Types</option>
                    {complaintType
                      .filter((type) => type.value !== "Other")
                      .map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                  </select>
                  <select
                    id="category-filter"
                    value={filters.category}
                    name="category"
                    onChange={handleFilterChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">All Categories</option>
                    {complaintCategories
                      .filter((cat) => cat.value !== "Other")
                      .map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                  </select>

                  <Typography
                    variant="body2"
                    sx={{ pt: 1, color: "text.secondary" }}
                  >
                    Date Range
                  </Typography>
                  <TextField
                    id="start_date"
                    label="From"
                    type="date"
                    size="small"
                    name="start_date"
                    value={filters.start_date}
                    onChange={handleFilterChange}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    id="end_date"
                    label="To"
                    type="date"
                    size="small"
                    name="end_date"
                    value={filters.end_date}
                    onChange={handleFilterChange}
                    InputLabelProps={{ shrink: true }}
                  />
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
                      "&:hover": { backgroundColor: "#027A3B", color: "#fff" },
                    }}
                  >
                    Reset Filters
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        </Stack>

        {/* Table */}
        <ReusableTable
          columns={getColumns()}
          rows={transformedRows}
          onViewClick={handleViewComplaint}
          showActions={true}
          showStatus={true}
          pagination={true}
          headerBackgroundColor="#20201E"
          totalPages={complaints?.total_pages}
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

export default HmoComplaints;
