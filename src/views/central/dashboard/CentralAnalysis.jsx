import { Box, Card, Typography } from "@mui/material";
import { FiArrowRight } from "react-icons/fi";
import PieChart from "../../../shared/PieChart";
import {
  centralBarData,
  complaintColor,
  complaintData,
  complaintDatabyRegion,
  dataByRegionColor
} from "../../../mock/chartData";
import { barOptions, options } from "../../../utils/config";
import GaugeChart from "../../../shared/SofaChart";
import BarChart from "../../../shared/BarChart";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useNavigate } from "react-router-dom";

const CentralAnalysis = () => {
  const navigate = useNavigate();
  const handleRegionalStats = () => {
    navigate("/central-regional-stats");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "28px",
            color: "#101828"
          }}
        >
          Analysis
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer"
          }}
          onClick={handleRegionalStats}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "18.9px",
              color: "#071C42"
            }}
          >
            View Regional stats
          </Typography>
          <ArrowForwardIosOutlinedIcon
            sx={{ color: "#071C42", width: 13, height: 13 }}
          />
        </Box>
      </Box>

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
            Registered HMO&apos;s
          </Typography>
          <Typography
            sx={{
              fontSize: "48px",
              fontWeight: 600,
              lineHeight: "72px",
              color: "#101828"
            }}
          >
            78
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer"
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "18.9px",
                color: "#071C42",
                textDecoration: "underline"
              }}
            >
              View list
            </Typography>
            <FiArrowRight />
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
            Registered HCF&apos;s
          </Typography>
          <Typography
            sx={{
              fontSize: "48px",
              fontWeight: 600,
              lineHeight: "72px",
              color: "#101828"
            }}
          >
            50,000
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer"
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "18.9px",
                color: "#071C42",
                textDecoration: "underline"
              }}
            >
              View list
            </Typography>
            <FiArrowRight />
          </Box>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
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
            Complaints
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", px: 10 }}>
            <PieChart
              title="Pie Chart Example"
              data={complaintData}
              options={options}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", px: 8 }}>
            {complaintColor.map((t) => (
              <Box key={t.id} sx={{ display: "flex", alignItems: "center" }}>
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
            gap: 3,
            p: 2,
            alignItems: "flex-start",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            width: "529px",
            height: "401px"
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
            Complaints volume by region
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", px: 16 }}>
            <PieChart
              title="Pie Chart Example"
              data={complaintDatabyRegion}
              options={options}
              width="236px"
              height="236px"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 2,
              px: 12
            }}
          >
            {dataByRegionColor.map((t) => (
              <Box key={t.id} sx={{ display: "flex", alignItems: "center" }}>
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
            gap: 3,
            p: 2,
            alignItems: "flex-start",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            width: "529px",
            height: "401px"
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
            Complaints Satisfaction
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", px: 16 }}>
            <GaugeChart value={30.1} />
          </Box>
        </Card>
      </Box>

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
            gap: 3,
            p: 2,
            alignItems: "flex-start",
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            width: "1007px",
            height: "401px"
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
            Complaints volume
          </Typography>
          <Box sx={{ display: "flex", alignItems: "flex-start ", px: 4 }}>
            <BarChart
              title="Bar Chart Example"
              data={centralBarData}
              options={barOptions}
              width="900px"
              height="300px"
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default CentralAnalysis;
