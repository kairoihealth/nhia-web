import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 4
          }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="h3" color="primary" gutterBottom>
              Something&apos;s wrong here...
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph>
              We can&apos;t find the page you&apos;re looking for. Check out our
              Help Center or head back to home.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: { xs: "center", md: "flex-start" }
              }}
            >
              <Button variant="contained" color="primary">
                Help
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "block" },
              textAlign: "center"
            }}
          >
            <HelpOutlineIcon sx={{ fontSize: 120, color: "gray" }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ErrorPage;
