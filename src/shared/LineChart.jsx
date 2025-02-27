import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";


const LineChart = ({ data, options }) => {
    ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
  return (
    <Box
      sx={{
        width: "325px", 
        height: '250px', 
        position: "relative", 
      }}
    >
      <Line
        data={data}
        options={{
          ...options, 
          maintainAspectRatio: false, 
          responsive: true, 
        }}
      />
    </Box>
  );
};

export default LineChart;

LineChart.propTypes = {
  data: PropTypes.object.isRequired, 
  options: PropTypes.object,
};