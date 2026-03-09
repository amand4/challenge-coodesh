import { Box, CircularProgress, SxProps, Theme } from "@mui/material";

interface QueryLoadingStateProps {
  sx?: SxProps<Theme>;
}

const QueryLoadingState = ({ sx }: QueryLoadingStateProps) => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 367px)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        ...sx,
      }}
    >
      <CircularProgress disableShrink />
    </Box>
  );
};

export default QueryLoadingState;
