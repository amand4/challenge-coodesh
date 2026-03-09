import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

const ReactHotToast = styled(Box)<BoxProps>(({ theme }) => {
  return {
    "& > div": {
      left: `${theme.spacing(6)} !important`,
      right: `${theme.spacing(6)} !important`,
      bottom: `${theme.spacing(6)} !important`,
      top: `${theme.spacing(6)} !important`,
    },
    "& .react-hot-toast": {
      fontWeight: 400,
      borderRadius: 8,
      fontSize: "1rem",
      letterSpacing: "0.14px",
      boxShadow: theme.shadows[6],
      zIndex: theme.zIndex.snackbar,
      color: theme.palette.text.primary,
      background: theme.palette.background.paper,
      "&>:first-of-type:not([role])>:first-of-type": {
        width: 14,
        height: 14,
      },
    },
  };
});

export default ReactHotToast;
