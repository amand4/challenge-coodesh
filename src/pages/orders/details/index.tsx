import React, { Fragment } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Helmet } from "react-helmet";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import QueryLoadingState from "@core/components/query-loading-state";
import QueryErrorState from "@core/components/query-error-state";
import PageHeader from "@core/components/page-header";
import ChipCell from "@core/components/grid-cells/ChipCell";
import TableBodyTrimmed from "@core/styles/mui/TableBodyTrimmed";
import TableRowAvoided from "@core/components/table-row-avoided";
import DetailLabel from "@core/components/detail-label";

import { useGetOrder } from "@core/hooks/api/useApi";

import { formatterDate } from "@core/utils/formatter-date";
import { ordersTypes, sidesTypes } from "@core/utils/labels";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useGetOrder(id);

  if (isLoading) {
    return (
      <Fragment>
        <Helmet>
          <title> Ordem - Detalhes </title>
        </Helmet>
        <QueryLoadingState />
      </Fragment>
    );
  }

  if (error) {
    return (
      <Fragment>
        <Helmet>
          <title> Ordem - Detalhes </title>
        </Helmet>
        <QueryErrorState error={error} resetErrorBoundary={refetch} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Helmet>
        <title> BASE Exchange - Ordem </title>
      </Helmet>
      <Box sx={{ px: 10, pt: 5 }}>
        <PageHeader
          title={
            <Typography variant="h5" color="white">
              {" "}
              Ordem{" "}
            </Typography>
          }
          subtitle={
            <Typography variant="body2" color="white">
              Detalhes da Ordem
            </Typography>
          }
        />

        <Box sx={{ textAlign: "right", pb: 1.25 }}>
          <Button
            onClick={() => navigate("/orders")}
            variant="contained"
            fullWidth={false}
          >
            Voltar
          </Button>
        </Box>
        <Card>
          <CardContent>
            <TableContainer>
              <Table size="small">
                <TableBodyTrimmed>
                  <TableRowAvoided label="ID" value={data?.id} />
                  <TableRowAvoided
                    label="Instrumento"
                    value={data?.instrument}
                  />
                  <TableRow>
                    <TableCell>
                      <DetailLabel text="Lado" />
                    </TableCell>
                    <TableCell>
                      <ChipCell {...sidesTypes[data?.side || "BUY"]} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <DetailLabel text="Status" />
                    </TableCell>
                    <TableCell>
                      <ChipCell {...ordersTypes[data?.status || "OPEN"]} />
                    </TableCell>
                  </TableRow>
                  <Fragment>
                    <TableRowAvoided
                      label="Preço"
                      value={data?.price.toString()}
                      currency={true}
                    />
                    <TableRowAvoided
                      label="Quantidade"
                      value={data?.quantity.toString()}
                    />
                    <TableRowAvoided
                      label="Data/Hora"
                      value={data?.createdAt}
                      formatter={formatterDate}
                    />
                  </Fragment>
                </TableBodyTrimmed>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Fragment>
  );
};

export default OrderDetail;
