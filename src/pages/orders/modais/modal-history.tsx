import { Box, Typography, CircularProgress } from "@mui/material";

import { useGetOrderHistory } from "@core/hooks/api/useApi";

import Modal from "@core/components/modal";
import { ordersTypes } from "@core/utils/labels";

interface ModalOrderHistoryProps {
  open: boolean;
  onClose: () => void;
  id: string | null;
}

export default function ModalHistoryOrder({
  open,
  onClose,
  id,
}: ModalOrderHistoryProps) {
  const { data, isLoading, isError } = useGetOrderHistory(id ?? undefined, {
    enabled: open && !!id,
  });

  const history = data ?? [];

  return (
    <Modal open={open} onClose={onClose} title="Histórico da Ordem">
      <Box display="flex" flexDirection="column" gap={2}>
        {isLoading && (
          <Box display="flex" justifyContent="center" py={2}>
            <CircularProgress size={24} />
          </Box>
        )}

        {isError && (
          <Typography color="error">Erro ao carregar histórico</Typography>
        )}

        {!isLoading && history?.length === 0 && (
          <Typography color="text.secondary">
            Nenhum histórico encontrado
          </Typography>
        )}

        {history.map((entry) => (
          <Box key={entry.id}>
            <Typography variant="body2">
              {entry.fromStatus ? ordersTypes[entry.fromStatus].label : "N/A"} →{" "}
              {ordersTypes[entry.toStatus].label}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {new Date(entry.timestamp).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>
    </Modal>
  );
}
