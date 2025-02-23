// import React from "react";
// import { Helmet } from "react-helmet-async";
import { Box, Container, Typography, Button, Card } from "@mui/material";
import Logo from "../../../assets/nhia-logo.png";

const ProvidersWelcomePage = () => {
  return (
    <>
      {/* <Helmet>
        <title>HMO</title>
        <meta name="HMO" content=" " />
        <link rel="canonical" href="/" />
      </Helmet> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#038F3E",
          height: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Card
              sx={{
                px: 4,
                py: {xs: 4, md: 12},
                backgroundColor: "#ffffff",
                textAlign: "center",
                width: "100%",
                maxWidth: 500,
                borderRadius: '25px',
              }}
            >
              <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ width: {xs: '70px', md: "126px"}, my: {xs: 2, md: 4} }}
            />
              <Typography sx={{fontSize: '32px', fontWeight: 500, lineHeight: '43.2px', color: '#038F3E'}} gutterBottom>
                Welcome to NHIA Complaint Management System
              </Typography>
              <Typography sx={{fontSize: '20px', fontWeight: 500, lineHeight: '27px', color: '#595959'}} gutterBottom>
                Get started on your complaints
              </Typography>
              <Button
                variant="contained"
                // fullWidth
                href="/providers-login-page"
                sx={{ width: '394px', height: '45px', borderRadius: '50px', backgroundColor: '#038F3E', color: '#FFFFFF', fontSize: '16px', fontWeight: 500, lineHeight: '24px', mt: {xs: 3, md:6}, py: '12px', px: '8px', textTransform: 'capitalize' }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                href="/providers-register-page"
                sx={{ width: '394px', height: '45px', borderRadius: '50px', border: '1px solid #038F3E', color: '#1B1C1E', fontSize: '16px', fontWeight: 500, lineHeight: '24px', mt: 2, py: '12px', px: '8px', textTransform: 'none' }}
              >
                Create an Account
              </Button>
            </Card>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProvidersWelcomePage;