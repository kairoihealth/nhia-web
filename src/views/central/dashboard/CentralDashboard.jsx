import { Box, Typography, Card } from "@mui/material";
import ReusableTable from "../../../shared/Table";
import ArrowRightAltTwoToneIcon from "@mui/icons-material/ArrowRightAltTwoTone";
import { useNavigate } from "react-router-dom";
import { frequencyOfComplaints } from "../../../mock/dashboard";
import LineChart from "../../../shared/LineChart";
import {
  barData,
  lineData,
  pieCentralColor,
  pieCentralData
} from "../../../mock/chartData";
import { barOptions, lineOptions, options } from "../../../utils/config";
import BarChart from "../../../shared/BarChart";
import PieChart from "../../../shared/PieChart";
import { useQuery } from "@tanstack/react-query";
import { getNewComplaints } from "../../../services/general";

const CentralDashboard = () => {
  const navigate = useNavigate();

  const { data: complaints } = useQuery({
    queryKey: ["new-complaints"],
    queryFn: () => getNewComplaints({ page: 1, pageSize: 5, status: "pending" })
  });

  const columns = [
    // { label: "ID", field: "id", align: "center" },
    {
      label: "Date",
      field: "created_at",
      format: (value) => new Date(value).toLocaleDateString()
    },
    { label: "Complainant", field: "name" },
    { label: "Complaint No", field: "complaint_no" },
    { label: "Complaint Category", field: "complaint_against" }
  ];

  const transformedRows =
    complaints?.results?.map((user) => ({
      created_at: new Date(user.created_at).toLocaleDateString(),
      name: `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      complaint_no: user.case_id,
      complaint_against: user.complaint_against,
      id: user.id,
      status: user.status
    })) || [];

  const handleViewComplaint = (row) => {
    navigate(`/admin/complaint/${row.complaint_no}`, {
      state: { complaint: row?.id }
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mt: 2,
          gap: 4,
          px: 4
        }}
      >
        {/*Left side*/}
        <Box sx={{ width: "100%" }}>
          {/* Top Cards */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 4,
              flexWrap: "wrap",
              mb: 4
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                p: 2,
                alignItems: "flex-start",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                width: "313px",
                height: "209px"
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "28px",
                  color: "#475467"
                }}
                gutterBottom
              >
                Total Complaints Received
              </Typography>
              <Typography
                sx={{
                  fontSize: "48px",
                  fontWeight: 600,
                  lineHeight: "72px",
                  color: "#20201E"
                }}
              >
                500
              </Typography>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                p: 2,
                alignItems: "flex-start",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                width: "313px",
                height: "209px"
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "28px",
                  color: "#475467"
                }}
                gutterBottom
              >
                Complaints Status
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", px: 10 }}>
                <PieChart
                  title="Pie Chart Example"
                  data={pieCentralData}
                  options={options}
                />
              </Box>
              <Box sx={{ display: "flex", px: 4 }}>
                {pieCentralColor.map((t) => (
                  <Box
                    key={t.id}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: t.color,
                        borderRadius: "50%",
                        margin: "0 8px"
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        lineHeight: "16px",
                        color: "#475467"
                      }}
                    >
                      {t.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.2,
                p: 1,
                alignItems: "flex-start",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                width: "313px",
                height: "209px"
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "28px",
                  color: "#475467",
                  p: 1
                }}
                gutterBottom
              >
                Regional Complaints
              </Typography>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <BarChart
                  title="Bar Chart Example"
                  data={barData}
                  options={barOptions}
                />
              </Box>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                p: 2,
                alignItems: "flex-start",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF",
                width: "313px",
                height: "209px"
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "28px",
                  color: "#475467"
                }}
                gutterBottom
              >
                Escalated Complaints
              </Typography>
              <Typography
                sx={{
                  fontSize: "48px",
                  fontWeight: 600,
                  lineHeight: "72px",
                  color: "#20201E"
                }}
              >
                40
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#071C42",
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/admin/complaints")}
              >
                View Complaints{" "}
                <ArrowRightAltTwoToneIcon sx={{ color: "#071C42" }} />
              </Typography>
            </Card>
          </Box>

          {/* Escalated Complaints Table */}
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "21.6px",
                  color: "#038F3E",
                  mb: 2
                }}
              >
                New Complaints
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#071C42",
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/admin/complaints")}
              >
                View Complaints{" "}
                <ArrowRightAltTwoToneIcon sx={{ color: "#038F3E" }} />
              </Typography>
            </Box>
            <ReusableTable
              columns={columns}
              rows={transformedRows}
              onViewClick={handleViewComplaint}
              showActions={false}
              showStatus={false}
            />
          </Box>
        </Box>

        {/*Right side*/}
        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: 4
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              p: 2,
              alignItems: "flex-start",
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "360px",
              height: "451px"
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#101828"
              }}
            >
              Most Complaints respondents
            </Typography>
            {frequencyOfComplaints.map((t) => (
              <Box
                key={t.id}
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "21.6px",
                    color: "#111827"
                  }}
                >
                  {t.title}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "16.94px",
                      color: "#000000"
                    }}
                  >
                    {t.number} Complaints
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "16.94px",
                      color: "#000000"
                    }}
                  >
                    &bull; {t.reason}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Card>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              p: 2,
              alignItems: "flex-start",
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              width: "360px",
              height: "313px"
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#101828"
              }}
            >
              Complaint Trends
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <LineChart
                title="Line Chart Example"
                data={lineData}
                options={lineOptions}
              />
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default CentralDashboard;
