import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';
// import { HelmetProvider } from "react-helmet-async";
// import './main.scss';
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      {/* <HelmetProvider> */}
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      {/* </HelmetProvider> */}
    </React.StrictMode>
  </BrowserRouter>
);
