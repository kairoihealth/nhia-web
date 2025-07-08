import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const GaugeChart = ({ value, width = 250, height = 200 }) => {
  const COLORS = ["#E53935", "#FDD835", "#43A047"]; // Red, Yellow, Green

  // Define gauge segments: Low (0-40), Medium (40-70), High (70-100)
  const data = [
    { value: 55 }, // Red (0-55)
    { value: 25 }, // Yellow (55-80)
    { value: 20 }, // Green (80-100)
  ];

  // Chart dimensions
  const chartWidth = 250;
  const chartHeight = 200;
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;

  // Needle configuration
  const needleLength = 35;
  const angle = 180 + (value / 100) * 180;
  const radians = (angle * Math.PI) / 180;

  // Needle coordinates
  const tipX = centerX + needleLength * Math.cos(radians);
  const tipY = centerY + needleLength * Math.sin(radians);

  return (
    <Box sx={{ textAlign: "center", width: width, height: height }}>
      <ResponsiveContainer width="100%" height={120}>
        <PieChart width={250} height={200}>
          <Pie
            data={data}
            cx={centerX}
            cy={centerY}
            startAngle={180}
            endAngle={0}
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          <g>
            {/* Needle line */}
            <line
              x1={centerX}
              y1={centerY}
              x2={tipX}
              y2={tipY}
              stroke="#212121"
              strokeWidth={3}
              strokeLinecap="round"
            />

            {/* Center pivot */}
            <circle cx={centerX} cy={centerY} r={4} fill="#212121" />
          </g>
        </PieChart>
      </ResponsiveContainer>

      <Typography variant="body2">
        Satisfaction Score <strong>{value}</strong>
      </Typography>
    </Box>
  );
};

export default GaugeChart;

GaugeChart.propTypes = {
  value: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};
