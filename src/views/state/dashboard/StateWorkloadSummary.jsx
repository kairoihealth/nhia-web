import { Box, Typography, Card, CircularProgress, Button } from "@mui/material";
import ReusableTable from "../../../shared/Table";
import { useQuery } from "@tanstack/react-query";
import { getWorkloadSummary } from "../../../services/general";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const StateWorkloadSummary = () => {
  const navigate = useNavigate();
  const stateId = localStorage.getItem("stateId");

  const {
    data: workload,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["workloadSummary", stateId],
    queryFn: () => getWorkloadSummary({ state_id: stateId }),
    enabled: !!stateId,
  });

  const columns = [
    { label: "Officer Name", field: "officer_name" },
    { label: "Officer Code", field: "officer_code" },
    { label: "Pending", field: "pending_complaints" },
    { label: "Active", field: "active_complaints" },
    { label: "Closed", field: "closed_complaints" },
    { label: "Total", field: "total_complaints" },
  ];

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
        <Typography variant="h5" gutterBottom>
          Team Workload Summary
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          An overview of case distribution across your team members.
        </Typography>

        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <ReusableTable
            columns={columns}
            rows={workload || []}
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

export default StateWorkloadSummary;
