// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "General Sans", 
      "Arial",
      "sans-serif", 
    ].join(","),
  },
});

export default theme;