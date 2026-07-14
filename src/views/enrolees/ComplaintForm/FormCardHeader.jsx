import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const FormCardHeader = ({ title, subtitle, titleSx, subtitleSx }) => (
  <>
    <Typography
      sx={{
        fontSize: { xs: "17px", sm: "19px" },
        fontWeight: 700,
        lineHeight: { xs: "1.3", md: "1.3" },
        color: "#1A1A1A",
        textAlign: "start",
        ...titleSx,
      }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        sx={{
          fontSize: { xs: "14px", sm: "14px" },
          fontWeight: 200,
          lineHeight: { xs: "1.3", md: "1.3" },
          color: "#6B6B6B",
          mb: 4,
          mt: 0.5,
          ...subtitleSx,
        }}
      >
        {subtitle}
      </Typography>
    )}
  </>
);

FormCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleSx: PropTypes.object,
  subtitleSx: PropTypes.object,
};

export default FormCardHeader;
