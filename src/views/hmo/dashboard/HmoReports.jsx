// import { Helmet } from "react-helmet-async";
import {
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField
} from "@mui/material";

const styles = {
  borderRadius: "8px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#DADADA"
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#038F3E"
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#038F3E"
  }
};

const textStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    "&:hover": {
      border: "1px solid #038F3E"
    },
    "&.Mui-focused": {
      border: "1px solid #038F3E",
      boxShadow: "none"
    }
  }
};

const HmoReports = () => {
  return (
    <Box>
      {/* <Helmet>
        <title>HMO Reports</title>
        <meta name="HMO Reports" content=" " />
        <link rel="canonical" href="/" />
      </Helmet> */}
      {/* Main Layout */}
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#FAFAFA",
          height: "100vh"
        }}
      >
        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {/* Sub Content */}
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1, gap: 4 }}>
            {/* Title */}
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#101828"
              }}
              gutterBottom
            >
              Reports
            </Typography>

            {/* Filters Section */}
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
              {/* Report Type */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "318px",
                  gap: 1
                }}
              >
                <Typography
                  sx={{
                    color: "#038F3E",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19.36px"
                  }}
                >
                  Report Type
                </Typography>
                <FormControl fullWidth sx={{ maxWidth: "318px" }}>
                  <Select
                    labelId="report-type-label"
                    id="report-type"
                    value=""
                    // label="Report Type"
                    sx={styles}
                  >
                    <MenuItem value="">Comparison Value</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Location */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "243px",
                  gap: 1
                }}
              >
                <Typography
                  sx={{
                    color: "#038F3E",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19.36px"
                  }}
                >
                  Location
                </Typography>
                <FormControl fullWidth sx={{ maxWidth: "243px" }}>
                  <Select
                    labelId="location-label"
                    id="location"
                    value=""
                    // label="Location"
                    sx={styles}
                  >
                    <MenuItem value="">Select Region</MenuItem>
                    <MenuItem value="Lagos">Lagos</MenuItem>
                    <MenuItem value="Kaduna">Kaduna</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Duration */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "265px",
                  gap: 1
                }}
              >
                <Typography
                  sx={{
                    color: "#038F3E",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "19.36px"
                  }}
                >
                  Duration
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    type="date"
                    placeholder="From"
                    // label="From"
                    variant="outlined"
                    sx={textStyles}
                  />
                  <TextField
                    type="date"
                    placeholder="To"
                    // label="To"
                    variant="outlined"
                    slotProps={{
                      placeholder: "To" // This sets the placeholder text
                    }}
                    sx={textStyles}
                  />
                </Box>
              </Box>

              {/* Generate Button */}
              <Button
                variant="contained"
                sx={{
                  width: "135px",
                  height: "51px",
                  backgroundColor: "#038F3E",
                  color: "#FFFFFF",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "19.36px",
                  borderRadius: "8px",
                  py: "16px",
                  px: "32px"
                }}
              >
                Generate
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "1044px",
                  height: "598px",
                  borderRadius: "8px",
                  backgroundColor: "#F5F5F5"
                }}
              ></Box>
              <Box
                sx={{
                  py: 4
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "249px",
                    height: "51px",
                    borderRadius: "8px",
                    backgroundColor: "#038F3E",
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "19.36px",
                    textTransform: "none",
                    color: "#FFFFFF"
                  }}
                >
                  Download as pdf
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HmoReports;
