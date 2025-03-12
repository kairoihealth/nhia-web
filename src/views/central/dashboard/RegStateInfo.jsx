import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, Typography } from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import PieChart from "../../../shared/PieChart";
import {
  lineData,
  pieColor,
  pieData,
  regComplaintData
} from "../../../mock/chartData";
import { barOptions, lineOptions, options } from "../../../utils/config";
import LineChart from "../../../shared/LineChart";
import BarChart from "../../../shared/BarChart";
import { complaintRespondents } from "../../../mock/dashboard";

const stateData = {
  "north-west": [
    {
      name: "Kano",
      slug: "kano",
      totalComplaints: 500,
      resolved: 450,
      satisfaction: 85,
      topPerformer: true,
      worstPerformer: false
    }
    // ... other states
  ]
  // ... other regions
};
const RegStateInfo = () => {
  const { slug, stateId } = useParams();
  const navigate = useNavigate();

  // Find state data using slug
  const regionStates = stateData[slug] || [];
  const state = regionStates.find((s) => s.slug === stateId);

  if (!state) return <div>State not found</div>;

  return (
    <Box sx={{ p: 2 }}>
      {/* Navigation Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          mb: 4
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosOutlinedIcon
          sx={{ color: "#101828", width: 15, height: 15 }}
        />
        <Typography variant="h5">{state.name}</Typography>
      </Box>

      {/* State Statistics */}

      <Box sx={{ display: "flex", gap: 4 }}>
        <Box>
          <Box sx={{ display: "flex", gap: 3 }}>
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
                {state.totalComplaints}
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
          </Box>

          <Box sx={{ display: "flex", my: 3, gap: 3 }}>
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
                Top Complaint Category
              </Typography>
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <BarChart
                  title="Bar Chart Example"
                  data={regComplaintData}
                  options={barOptions}
                />
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
                width: "360px",
                height: "239px"
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
                  height="180px"
                />
              </Box>
            </Card>
          </Box>
        </Box>
        <Box>
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
              Most Complaints Respondents
            </Typography>
            {complaintRespondents.map((t) => (
              <Box key={t.id} sx={{ display: "flex", gap: 1 }}>
                <img
                  src={t.icon}
                  alt=""
                  style={{ width: "37px", height: "37px" }}
                />
                <Box>
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
              </Box>
            ))}
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default RegStateInfo;
