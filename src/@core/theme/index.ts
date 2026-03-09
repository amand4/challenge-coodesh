import { createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";

let theme = createTheme({
  palette,
  typography,
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          lineHeight: "14px",
          letterSpacing: "0.5px",
          fontSize: "14px",
          padding: "11px",
          "&:hover": {
            backgroundColor: palette.secondary.main,
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 0,
          color: theme.palette.text.primary,
          "& .MuiDataGrid-overlay": {
            backgroundColor: theme.palette.background.paper,
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none",
            },
        },
        row: {
          cursor: "pointer",
        },
        cell: {
          display: "flex",
          alignItems: "center",
          "&:focus, &:focus-within": {
            outline: "none",
          },
        },
      },
    },
  },
});

export default theme;
