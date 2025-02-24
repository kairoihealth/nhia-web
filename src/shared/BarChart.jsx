import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";


const BarChart = ({ data, options }) => {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  return (
    <Box
      sx={{
        width: "100%", 
        height: '150px', 
        position: "relative", 
      }}
    >
      <Bar
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

export default BarChart;

BarChart.propTypes = {
  data: PropTypes.object.isRequired, 
  options: PropTypes.object,
};