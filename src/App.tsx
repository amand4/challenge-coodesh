import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@mui/material";
import ReactHotToast from "@core/styles/libs/react-hot-toast";

import Router from "configs/router";

import theme from "@core/theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Router />
        <ReactHotToast>
          <Toaster
            position="top-right"
            toastOptions={{ className: "react-hot-toast", duration: 5000 }}
          />
        </ReactHotToast>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
