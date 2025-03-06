import { PieChart, Pie, Cell, Line, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const GaugeChart = ({ value }) => {
  // Define gauge colors (Red, Yellow, Green)
  const COLORS = ["#E53935", "#FDD835", "#43A047"];

  // Segments for the gauge
  const data = [
    { value: 30 }, // Red
    { value: 30 }, // Yellow
    { value: 40 } // Green
  ];

  // Convert satisfaction score (0-5) to a rotation degree (approximation)
  const angle = ((value - 1) / 4) * 180 - 90;

  return (
    <Box sx={{ textAlign: "center", width: 250, height: 200 }}>
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            // paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          {/* Needle */}
          <Line
            x1="50%"
            y1="100%"
            x2={`${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`}
            y2={`${100 + 40 * Math.sin((angle * Math.PI) / 180)}%`}
            stroke="black"
            strokeWidth={2}
          />
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
  value: PropTypes.number.isRequired
};
