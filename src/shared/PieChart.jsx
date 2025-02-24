import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const PieChart = ({ data, options }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <Box
      sx={{
        width: "130px", 
        height: "130px",
        position: "relative", 
      }}
    >
      <Pie
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

export default PieChart;

PieChart.propTypes = {
  data: PropTypes.object.isRequired, 
  options: PropTypes.object,
};