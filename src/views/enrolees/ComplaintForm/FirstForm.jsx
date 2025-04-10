// import { Helmet } from "react-helmet-async";
import Logo from "../../../assets/nhia-logo.png";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Typography
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#F5F5F5",
    color: "#737373",
    border: "0.5px solid #DADADA",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#038F3E"
    }
  }
};

const formControlStyles = {
  width: "100%",
  height: "55px",
  borderRadius: "8px",
  backgroundColor: "#F5F5F5",
  color: "#737373",
  border: "0.5px solid #DADADA",
  paddingY: "34px",
  fontSize: "16px",
  outline: "none"
};

const selectStyles = {
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "#F5F5F5",
  color: "#737373",
  border: "0.5px solid #DADADA",
  fontSize: "16px",
  outline: "none",
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#038F3E" // Green border color
  }
};

const FirstForm = () => {
  return (
    <>
      {/* <Helmet>
        <title>Enrolee Complaint Form</title>
        <meta name="Enrolee Complaint Form" content=" " />
        <link rel="canonical" href="/" />
      </Helmet> */}
      <Box
        sx={{
          backgroundColor: { xs: "#FFFFFF", md: "#038F3E" }
          // height: "100%"
        }}
      >
        {/* <Container> */}
        <Box
          sx={{
            display: { xs: "grid", md: "flex" },
            justifyContent: "center",
            alignItems: { xs: "flex-start", md: "center" },
            pt: { xs: 0, md: 4 }
          }}
        >
          <Box>
            <Box
              sx={{
                width: { xs: "400px", md: "1280px" },
                backgroundColor: "#fff",
                padding: "2rem",
                margin: { xs: 0, md: "2rem" },
                borderRadius: "8px"
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{ display: "block", margin: "0 auto" }}
              />
              <Typography
                align="center"
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  color: "#038F3E",
                  margin: "1rem 0"
                }}
              >
                Complaint Form
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  color: "#1B1C1E",
                  my: 4
                }}
              >
                Complainant Details
              </Typography>
              <form>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                >
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      First Name
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="enter first name"
                      sx={textFieldStyles}
                    />
                  </Box>
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Last Name
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="enter last name"
                      sx={textFieldStyles}
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                  mt={2}
                >
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Middle Name
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="enter middle name"
                      sx={textFieldStyles}
                    />
                  </Box>
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Contact Address
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="e.g H23 dolphin estate"
                      sx={textFieldStyles}
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                  mt={2}
                >
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Email Address
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      type="email"
                      placeholder="example@example.com"
                      sx={textFieldStyles}
                    />
                  </Box>
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Phone Number
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <FormControl fullWidth>
                      <PhoneInput
                        country={"ng"}
                        inputStyle={formControlStyles}
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                  mt={2}
                >
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      NHIA Number
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      required
                      placeholder="enter NHIA number"
                      sx={textFieldStyles}
                    />
                  </Box>
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Alternative Phone Number
                    </Typography>
                    <FormControl fullWidth>
                      <PhoneInput
                        country={"ng"}
                        inputStyle={formControlStyles}
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={2}
                  mt={2}
                >
                  <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Complaint against
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <Select sx={selectStyles}>
                        <MenuItem
                          value=""
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#737373"
                          }}
                        >
                          Select option
                        </MenuItem>
                        <MenuItem value="hmo">HMO</MenuItem>
                        <MenuItem value="provider">Providers</MenuItem>
                        <MenuItem value="nhia">NHIA</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <Box
                    flex={1}
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: "#595959",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px"
                      }}
                    >
                      Name of respondent
                      <span style={{ color: "#099243", marginLeft: "6px" }}>
                        *
                      </span>
                    </Typography>
                    <FormControl fullWidth variant="outlined">
                      <Select sx={selectStyles}>
                        <MenuItem
                          value=""
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#737373"
                          }}
                        >
                          Select option
                        </MenuItem>
                        <MenuItem value="hmo">HMO</MenuItem>
                        <MenuItem value="provider">Providers</MenuItem>
                        <MenuItem value="nhia">NHIA</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}
                </Box>
                <Box
                  sx={{
                    display: { xs: "grid", md: "flex" },
                    justifyContent: { xs: "center", md: "flex-end" },
                    gap: 2,
                    mt: 4
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      width: "270px",
                      height: "48px",
                      borderRadius: "16px",
                      py: 1.5,
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: 500,
                      lineHeight: "24px",
                      textTransform: "capitalize",
                      borderColor: "#038F3E",
                      color: "#038F3E",
                      "&:hover": { borderColor: "#038F3E" }
                    }}
                    href="/account-type"
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      width: "270px",
                      height: "48px",
                      borderRadius: "16px",
                      py: 1.5,
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: 500,
                      lineHeight: "24px",
                      textTransform: "capitalize",
                      backgroundColor: "#038F3E",
                      "&:hover": { backgroundColor: "#038F3E" }
                    }}
                    href="/enrollee-complaint-second-form"
                  >
                    Save & Continue
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
        {/* </Container> */}
      </Box>
    </>
  );
};

export default FirstForm;
