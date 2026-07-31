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
    { label: "First Name", field: "firstname" },
    { label: "Last Name", field: "lastname" },
    { label: "State", field: "state" },
    { label: "Active Cases", field: "active_case_count" },
    { label: "Lifetime Assigned", field: "assigned_count" },
  ];

  const transformedRows =
    workload?.admins?.map((admin) => ({
      ...admin,
      state: admin.state || "Federal",
    })) ||
    (workload && !workload.admins ? workload : []) ||
    [];

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

        <Box sx={{ mb: 3, maxWidth: "300px" }}>
          <TextField
            select
            fullWidth
            label="Filter by State"
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            size="small"
          >
            <MenuItem value="">All States</MenuItem>
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
