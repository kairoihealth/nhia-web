import { Box } from "@mui/material";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data, options, width = "100%", height = "150px" }) => {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  return (
    <Box
      sx={{
        width: width,
        height: height,
        position: "relative"
      }}
    >
      <Bar
        data={data}
        options={{
          ...options,
          maintainAspectRatio: false,
          responsive: true
        }}
      />
    </Box>
  );
};

export default BarChart;

BarChart.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string
};
