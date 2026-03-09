import { Paper, Typography, Button, SxProps, Theme } from "@mui/material";

interface QueryErrorStateProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  sx?: SxProps<Theme>;
}

const QueryErrorState = ({
  error,
  resetErrorBoundary,
  sx,
}: QueryErrorStateProps) => {
  return (
    <Paper
      sx={{
        height: "250px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        Desculpe, não foi possível carregar as informações.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {error?.message || "Tente novamente mais tarde."}
      </Typography>
      {resetErrorBoundary && (
        <Button variant="outlined" size="small" onClick={resetErrorBoundary}>
          Tentar novamente
        </Button>
      )}
    </Paper>
  );
};

export default QueryErrorState;
