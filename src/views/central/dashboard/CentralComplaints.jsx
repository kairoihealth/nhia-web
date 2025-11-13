import { useState, useRef, useEffect } from "react";
// import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { TabButton } from "../../../shared/TabPanel";
import ReusableTable from "../../../shared/Table";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getComplaints } from "../../../services/general";
import { FiFilter } from "react-icons/fi";
import { getRegions, getStates } from "../../../services/settings";
import { useMemo } from "react";
import { complaintCategories, complaintType } from "../../../mock/type";
import InfoIcon from "@mui/icons-material/Info";

const initialFilters = {
  type: "",
  category: "",
  status: "",
  state_id: "",
  region_id: "",
  start_date: "",
  end_date: "",
};

// CentralComplaints Component
const CentralComplaints = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const filterButtonRef = useRef(null);
  const popoverRef = useRef(null);

  const { data: statesData, isLoading: isLoadingStates } = useQuery({
    queryKey: ["states"],
    queryFn: () => getStates(),
  });

  const states = useMemo(
    () =>
      statesData?.results?.map((t) => ({
        value: t.id,
        label: t.name,
      })) || [],
    [statesData]
  );

  const { data: regionsData, isLoading: isLoadingRegions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getRegions({}),
  });

  const regions = useMemo(
    () =>
      regionsData?.results?.map((t) => ({
        value: t.id,
        label: t.name,
      })) || [],
    [regionsData]
  );

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

  const getColumns = () => [
    {
      label: "",
      field: "isOverdue",
      align: "center",
      format: (isOverdue) => {
        if (isOverdue) {
          const tooltipStyle = {
            visibility: "hidden",
            width: "160px",
            backgroundColor: "black",
            color: "#fff",
            textAlign: "center",
            borderRadius: "6px",
            padding: "5px 0",
            position: "absolute",
            zIndex: 1,
            bottom: "-24%",
            left: "100%",
            opacity: 1,
            transition: "opacity 0.3s",
          };

          const tooltipContainerStyle = {
            position: "relative",
            display: "inline-block",
          };

          return (
            <div
              style={tooltipContainerStyle}
              onMouseOver={(e) => {
                e.currentTarget.children[1].style.visibility = "visible";
                e.currentTarget.children[1].style.opacity = 1;
              }}
              onMouseOut={(e) => {
                e.currentTarget.children[1].style.visibility = "hidden";
                e.currentTarget.children[1].style.opacity = 0;
              }}
            >
              <IconButton size="small">
                <InfoIcon sx={{ color: "red" }} />
              </IconButton>
              <span style={tooltipStyle}>
                This complaint has exceeded 15 hours.
              </span>
            </div>
          );
        }
        return null;
      },
    },
    { label: "Date", field: "created_at", align: "center" },
    { label: "Complainant", field: "name", align: "center" },
    { label: "Complaint no", field: "complaint_no", align: "center" },
    { label: "Complaint type", field: "type", align: "center" },
    { label: "Location", field: "location", align: "center" },
  ];

  const isOverdue = (createdAt) => {
    const complaintDate = new Date(createdAt);
    const now = new Date();
    const diffInHours =
      (now.getTime() - complaintDate.getTime()) / (1000 * 60 * 60);
    return diffInHours > 15;
  };

  const transformedRows =
    complaints?.results?.map((complaint) => ({
      created_at: new Date(complaint.created_at).toLocaleDateString(),
      name: `${complaint.firstname || ""} ${complaint.lastname || ""}`.trim(),
      complaint_no: complaint.case_id,
      type: complaint.complaint_type,
      location: complaint?.state?.name,
      id: complaint.id,
      status: complaint.status,
      isOverdue: isOverdue(complaint.created_at),
    })) || [];
  console.log(transformedRows, "transformedRows");

  // const filteredRows = transformedRows.filter((row) => {
  //   // Tab filter
  //   let tabMatch = true;
  //   if (activeTab === "new") tabMatch = row.status === "pending";
  //   else if (activeTab === "act") tabMatch = row.status === "active";
  //   else if (activeTab === "com") tabMatch = row.status === "closed";
  //   else if (activeTab === "esc") tabMatch = row.status === "escalated";

  //   // // Popover filters
  //   // const categoryMatch = filters.category
  //   //   ? row.type === filters.category
  //   //   : true;
  //   // const statusMatch = filters.status ? row.status === filters.status : true;

  //   // const rowDate = new Date(row.created_at);
  //   // const dateFromMatch = filters.start_date
  //   //   ? rowDate >= new Date(filters.start_date)
  //   //   : true;
  //   // const dateToMatch = filters.end_date
  //   //   ? rowDate <= new Date(filters.end_date)
  //   //   : true;

  //   return tabMatch;
  //   //  && categoryMatch && statusMatch && dateFromMatch && dateToMatch
  // });

  const handleViewComplaint = (row) => {
    navigate(`/admin/complaint/${row.complaint_no}`, {
      state: { complaint: row?.id },
    });
  };
  const buttonTextMapping = {
    "": "View Complaint",
    pending: "View Complaint",
    active: "View Complaint",
    closed: "View Resolution",
    escalated: "View Complaint",
  };

  if (isLoading || isLoadingStates || isLoadingRegions) {
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
    <Box aria-hidden={false}>
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

                  <select
                    id="region-filter"
                    value={filters.region_id}
                    name="region_id"
                    onChange={handleFilterChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">All Regions</option>
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>

                  <select
                    id="state-filter"
                    value={filters.state_id}
                    name="state_id"
                    onChange={handleFilterChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">All States</option>
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
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
          actionButtonText={buttonTextMapping[filters.status]}
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

export default CentralComplaints;
