import { Box, Button, Typography } from "@mui/material";

const EmailVerifiedSection = () => {
  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
      <Typography sx={{fontSize: '32px', fontWeight: 500, lineHeight: '43.2px', color: '#038F3E'}}>Email Verified</Typography>
      <Typography sx={{fontSize: '16px', fontWeight: 400, lineHeight:'21.6px', color: '#475467', width: '360px'}}>
        Your email has been successfully verified. Click below to continue.
      </Typography>
      </Box>
      <Button
        variant="contained"
        type="submit"
        href="/dashboard"
        sx={{width: '360px', height: '56px', fontSize: '16px', fontWeight: 500, lineHeight: '21.6px', py: '10px', px: '18px', borderRadius: '50px', backgroundColor: "#038F3E", my: 3, textTransform: 'none' }}
      >
        Continue to dashboard
      </Button>
    </>
  );
};

export default EmailVerifiedSection;
