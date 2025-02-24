import { Box, Typography, Card } from "@mui/material";
import ReusableTable from "../../../shared/Table";
// import DashboardLayout from "../../../shared/DashboardLayout";
import ArrowRightAltTwoToneIcon from "@mui/icons-material/ArrowRightAltTwoTone";
import { useNavigate } from "react-router-dom";
import { frequencyOfComplaints } from "../../../mock/dashboard";
import PieChart from "../../../shared/PieChart";
import { barData, lineData, pieData } from "../../../mock/chartData";
import BarChart from "../../../shared/BarChart";
import LineChart from "../../../shared/LineChart";

const Dashboard = () => {
  const navigate = useNavigate();

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "top"
      }
    }
  };

  const barOptions = {
    responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  }
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: false, // Start the x-axis at the first label
      },
      y: {
        beginAtZero: true, // Start the y-axis at zero
      },
    },
  };

  const columns = [ 
    // { label: "ID", field: "id", align: "center" },
    {
      label: "Date",
      field: "date",
      format: (value) => new Date(value).toLocaleDateString()
    },
    { label: "Complainant", field: "name" },
    { label: "Complaint No", field: "number" },
    { label: "Complaint Category", field: "category" }
  ];

  const rows = [
    {
      id: 1,
      name: "John Doe",
      number: "11023",
      date: "2023-10-01",
      category: "HMO"
    },
    {
      id: 2,
      name: "John Doe",
      number: "11023",
      date: "2023-10-01",
      category: "HMO"
    },
    {
      id: 3,
      name: "John Doe",
      number: "11023",
      date: "2023-10-01",
      category: "HMO"
    },
    {
      id: 4,
      name: "John Doe",
      number: "11023",
      date: "2023-10-01",
      category: "HMO"
    },
    {
      id: 5,
      name: "John Doe",
      number: "11023",
      date: "2023-10-01",
      category: "HMO"
    }
  ];

  const handleViewClick = (row) => {
    alert("View clicked for:", row);
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
                  data={pieData}
                  options={options}
                />
              </Box>
            </Card>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: .2,
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
                  p:1
                }}
                gutterBottom
              >
                Complaint Volume
              </Typography>
              <Box sx={{ display: "flex", alignItems: "flex-start"}}>
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
                Compliance with Regulations
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
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  color: "#1B1C1E",
                  mb: 2
                }}
              >
                Escalated Complaints
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "18.9px",
                  color: "#038F3E",
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/hmo-complaints")}
              >
                View Complaints{" "}
                <ArrowRightAltTwoToneIcon sx={{ color: "#038F3E" }} />
              </Typography>
            </Box>
            <ReusableTable
              columns={columns}
              rows={rows}
              onViewClick={handleViewClick}
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
              Frequency of Complaints
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
                      color: "#737373"
                    }}
                  >
                    {t.number} Complaints
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "16.94px",
                      color: "#737373"
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
              gap: .5,
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
                color: "#101828",
                px:1
              }}
            >
              Complaint Trend
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start"}}>
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

export default Dashboard;
