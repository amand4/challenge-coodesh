import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import dayjs from "dayjs";

import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, Tooltip } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box } from "@mui/material";

import PageHeader from "@core/components/page-header";
import TextCell from "@core/components/grid-cells/TextCell";
import Table from "@core/components/table";
import ChipCell from "@core/components/grid-cells/ChipCell";

import ModalCancelOrder from "./modais/modal-cancellation";
import ModalHistoryOrder from "./modais/modal-history";

import { useGetOrders } from "@core/hooks/api/useApi";
import { ordersTypes, sidesTypes } from "@core/utils/labels";

type ModalProps = {
  id: string | null;
  open: boolean;
};

export default function Orders() {
  const navigate = useNavigate();

  const [modalHistory, setModalHistory] = useState<ModalProps>({
    id: null,
    open: false,
  });

  const [modalCancel, setModalCancel] = useState<ModalProps>({
    id: null,
    open: false,
  });

  return (
    <Fragment>
      <Helmet>
        <title>BASE Exchange - Ordens</title>
      </Helmet>
      <Box sx={{ px: 10, pt: 5 }}>
        <PageHeader
          title={
            <Typography variant="h5" color="white">
              Ordens
            </Typography>
          }
          subtitle={
            <Typography variant="body2" color="white">
              Visualize e acompanhe as ordens de compra e venda
            </Typography>
          }
        />
        <Box sx={{ textAlign: "right", pb: 1.25 }}>
          <Button
            onClick={() => navigate("/orders/add")}
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth={false}
          >
            Nova Ordem
          </Button>
        </Box>
        <Table
          useQuery={useGetOrders}
          columns={[
            {
              minWidth: 200,
              field: "id",
              headerName: "ID",
              type: "number",
              filterable: true,
              renderCell: ({ value }) => <TextCell value={value} />,
            },
            {
              minWidth: 100,
              field: "instrument",
              headerName: "Instrumento",
              filterable: true,
              renderCell: ({ value }) => <TextCell value={value} />,
            },
            {
              minWidth: 80,
              field: "side",
              headerName: "Lado",
              filterable: true,
              valueOptions: [
                { value: "BUY", label: "Compra" },
                { value: "SELL", label: "Venda" },
              ],
              renderCell: ({ value }) => (
                <ChipCell {...sidesTypes[value || "BUY"]} />
              ),
            },
            {
              minWidth: 100,
              field: "price",
              headerName: "Preço",
              filterable: false,
              renderCell: ({ value }) => (
                <TextCell value={`R$ ${Number(value).toFixed(2)}`} />
              ),
            },
            {
              minWidth: 100,
              field: "quantity",
              headerName: "Quantidade",
              filterable: false,
              renderCell: ({ value }) => <TextCell value={value} />,
            },
            {
              minWidth: 180,
              field: "remainingQuantity",
              headerName: "Qtd Restante",
              filterable: false,
              renderCell: ({ value }) => <TextCell value={value} />,
            },
            {
              minWidth: 150,
              field: "status",
              headerName: "Status",
              filterable: true,
              type: "singleSelect",
              valueOptions: [
                { value: "OPEN", label: "Aberta" },
                { value: "EXECUTED", label: "Executada" },
                { value: "CANCELLED", label: "Cancelada" },
              ],
              renderCell: ({ value }) => (
                <ChipCell {...ordersTypes[value || "OPEN"]} />
              ),
            },
            {
              minWidth: 180,
              field: "createdAt",
              headerName: "Data/Hora",
              filterable: true,
              renderCell: ({ value }) => (
                <TextCell value={dayjs(value).format("DD/MM/YYYY HH:mm")} />
              ),
            },
            {
              field: "actions",
              headerName: "Ações",
              minWidth: 150,
              filterable: false,
              renderCell: ({ row }) => {
                const canCancel = ["OPEN", "PARTIAL"].includes(row.status);

                return (
                  <Box>
                    <Tooltip title="Ver detalhes da ordem" arrow>
                      <IconButton onClick={() => navigate(`/orders/${row.id}`)}>
                        <VisibilityIcon color="primary" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Cancelar ordem" arrow>
                      <span>
                        <IconButton
                          disabled={!canCancel}
                          onClick={() =>
                            setModalCancel({
                              open: true,
                              id: row.id,
                            })
                          }
                        >
                          <CancelIcon color="primary" />
                        </IconButton>
                      </span>
                    </Tooltip>

                    <Tooltip title="Ver histórico da ordem" arrow>
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          setModalHistory({
                            id: row.id,
                            open: true,
                          });
                        }}
                      >
                        <HistoryIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                );
              },
            },
          ]}
        />
      </Box>
      <ModalCancelOrder
        open={modalCancel.open}
        id={modalCancel.id}
        onClose={() => {
          setModalCancel({
            open: false,
            id: null,
          });
        }}
      />
      <ModalHistoryOrder
        open={modalHistory.open}
        id={modalHistory.id}
        onClose={() => {
          setModalHistory({
            open: false,
            id: null,
          });
        }}
      />
    </Fragment>
  );
}
