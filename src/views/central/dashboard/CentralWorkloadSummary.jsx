import {
  Box,
  Typography,
  Card,
  CircularProgress,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import ReusableTable from "../../../shared/Table";
import { useQuery } from "@tanstack/react-query";
import { getWorkloadSummary } from "../../../services/general";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getStates } from "../../../services/settings";
import FormCardHeader from "../../enrolees/ComplaintForm/FormCardHeader";

const CentralWorkloadSummary = () => {
  const navigate = useNavigate();
  const [stateId, setStateId] = useState("");

  const {
    data: workload,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["workloadSummary", stateId],
    queryFn: () => getWorkloadSummary({ state_id: stateId }),
  });

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const columns = [
    { label: "Officer", field: "name" },
    { label: "Email", field: "email" },
    { label: "Role", field: "role" },
    { label: "Officer Code", field: "officer_code" },
    { label: "State", field: "state" },
    { label: "Active Cases", field: "active_case_count" },
    { label: "Overdue", field: "overdue_case_count" },
    { label: "Lifetime Assigned", field: "assigned_count" },
  ];

  const transformedRows = (workload?.admins || []).map((admin) => ({
    ...admin,
    // An officer who has not filled in their profile still needs to be
    // identifiable, so the email stands in for a missing name.
    name:
      [admin.firstname, admin.lastname].filter(Boolean).join(" ") ||
      admin.email,
    officer_code: admin.officer_code || "—",
    // A central admin has no state of their own; they cover the federation.
    state: admin.state || "Federal",
  }));

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
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "#1B5E20", textTransform: "none" }}
      >
        Back
      </Button>
      <Card
        sx={{
          m: 2,
          p: { xs: 1, md: 2 },
          borderRadius: "12px",
          boxShadow: "0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A",
        }}
      >
        <FormCardHeader
          title="Team Workload Summary"
          subtitle="An overview of case distribution across your team members."
        />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 3 }}>
          {[
            { label: "Officers", value: workload?.officer_count ?? 0 },
            { label: "Active cases", value: workload?.total_active_cases ?? 0 },
            { label: "Overdue", value: workload?.total_overdue_cases ?? 0 },
          ].map((stat) => (
            <Box key={stat.label}>
              <Typography sx={{ fontSize: "13px", color: "#6B6B6B" }}>
                {stat.label}
              </Typography>
              <Typography
                sx={{ fontSize: "22px", fontWeight: 700, color: "#1B5E20" }}
              >
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ mb: 3, maxWidth: "340px" }}>
          <TextField
            select
            fullWidth
            label="Filter by State"
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            size="small"
          >
            <MenuItem value="">All states &amp; federal officers</MenuItem>
            {states?.results?.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <ReusableTable
            columns={columns}
            rows={transformedRows}
            showActions={false}
            showStatus={false}
            pagination={true}
            // headerBackgroundColor="#20201E"
            totalPages={1}
            page={1}
            setPage={() => {}}
            pageSize={10}
            setPageSize={() => {}}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default CentralWorkloadSummary;
