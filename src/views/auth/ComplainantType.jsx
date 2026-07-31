import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import TwoColumnLayout from "../../components/layout/TwoColumnLayout";

const ComplainantType = () => {
  return (
    <TwoColumnLayout>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h5" color="primary">
          Complainant Type (Placeholder)
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This component is now a placeholder. Its functionality has been moved
          to `ComplainantTypeSelection.jsx` within the enrollee complaint flow.
        </Typography>
      </Box>
    </TwoColumnLayout>
  );
};

ComplainantType.propTypes = {}; // No props needed for a placeholder

export default ComplainantType;
