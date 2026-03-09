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
  },
});

export default theme;
