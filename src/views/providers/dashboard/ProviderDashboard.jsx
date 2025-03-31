import { Box, Typography, Card } from "@mui/material";
import ReusableTable from "../../../shared/Table";
import ArrowRightAltTwoToneIcon from "@mui/icons-material/ArrowRightAltTwoTone";
import { useNavigate } from "react-router-dom";
import PieChart from "../../../shared/PieChart";
import {
  categoryColor,
  lineData,
  pieCatogryData,
  pieColor,
  pieData
} from "../../../mock/chartData";
import LineChart from "../../../shared/LineChart";
import { lineOptions, options } from "../../../utils/config";
import GaugeChart from "../../../shared/SofaChart";

const ProviderDashboard = () => {
  const navigate = useNavigate();

  const columns = [
    // { label: "ID", field: "id", align: "center" },
    {
      label: "Date",
      field: "date",
      format: (value) => new Date(value).toLocaleDateString()
    },
    { label: "Complainant", field: "name" },
    { label: "Complaint No", field: "number" },
    { label: "Complaint Category", field: "category" },
    { label: "Priority Rating", field: "rating" }
  ];

  const rows = [
    {
      id: 1,
      name: "John Doe",
      number: "11023",
      date: "2023-10-01",
      category: "HMO",
      rating: "High"
    },
    {
      id: 2,
      name: "John Doe",
      number: "11023",
      date: "2023-10-01",
      category: "HMO",
      rating: "Medium"
    },
    {
      id: 3,
      name: "John Doe",
      number: "11023",
      date: "2023-10-01",
      category: "HMO",
      rating: "High"
    },
    {
      id: 4,
      name: "John Doe",
      number: "11023",
      date: "2023-10-01",
      category: "HMO",
      rating: "Top"
    },
    {
      id: 5,
      name: "John Doe",
      number: "11023",
      date: "2023-10-01",
      category: "HMO",
      rating: "High"
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
              <Box sx={{ display: "flex" }}>
                {pieColor.map((t) => (
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
                Category of Complaints
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", px: 10 }}>
                <PieChart
                  title="Pie Chart Example"
                  data={pieCatogryData}
                  options={options}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", px: 3 }}>
                {categoryColor.map((t) => (
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
                Compliance with Regulations
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
                <GaugeChart value={70.1} />
              </Box>
            </Card>
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
                color: "#101828",
                px: 1
              }}
            >
              Complaint Trend
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <LineChart
                title="Line Chart Example"
                data={lineData}
                options={lineOptions}
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
              width: "356px",
              height: "119px"
            }}
          >
            {/* <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#101828"
              }}
            >
              Complaint Trend
            </Typography> */}
          </Card>
        </Box>
      </Box>
      {/* Escalated Complaints Table */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
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
            onClick={() => navigate("/provider/complaints")}
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
  );
};

export default ProviderDashboard;
