import { Button, Typography } from "@mui/material";
import Modal from "@core/components/modal";
import { useCancelOrder } from "@core/hooks/api/useApi";
import { fmtAxiosMessage } from "@core/services/api/utils";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  id: string | null;
}

export default function ModalCancelOrder({ open, onClose, id }: Props) {
  const { mutateAsync: cancelOrder, isPending: isCancalling } =
    useCancelOrder();

  const handleConfirm = async () => {
    if (!id) {
      toast.error("ID da ordem inválido");
      return;
    }

    try {
      await cancelOrder({ id });
      toast.success("Ordem cancelada com sucesso");
      onClose();
    } catch (error: unknown) {
      toast.error(fmtAxiosMessage(error)?.description);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Confirmar Cancelamento"
      actions={
        <>
          <Button
            onClick={onClose}
            disabled={isCancalling}
            color="primary"
            variant="contained"
          >
            Voltar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleConfirm}
            disabled={isCancalling}
          >
            {isCancalling ? "Cancelando..." : "Confirmar"}
          </Button>
        </>
      }
    >
      <Typography>Tem certeza que deseja cancelar esta ordem?</Typography>

      <Typography variant="body2" color="text.secondary" mt={2}>
        Esta ação não poderá ser desfeita.
      </Typography>
    </Modal>
  );
}
