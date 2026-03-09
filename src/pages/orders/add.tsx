import { Fragment } from "react";
import { toast } from "react-toastify";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

import PageHeader from "@core/components/page-header";

import { usePostOrder } from "@core/hooks/api/useApi";
import { fmtAxiosMessage } from "@core/services/api/utils";

const schema = yup.object({
  instrument: yup.string().required("Instrumento é obrigatório"),

  side: yup.string().oneOf(["BUY", "SELL"]).required(),

  price: yup
    .number()
    .typeError("Preço obrigatório")
    .positive("Preço deve ser maior que zero")
    .required("Preço obrigatório"),

  quantity: yup
    .number()
    .typeError("Quantidade obrigatória")
    .positive("Quantidade deve ser maior que zero")
    .required("Quantidade obrigatória"),
});

type FormValues = yup.InferType<typeof schema>;

export default function Add() {
  const navigate = useNavigate();
  const { mutateAsync: createOrder, isPending: isCreating } = usePostOrder();

  const instruments = [
    "PETR4",
    "VALE3",
    "ITUB4",
    "BBDC4",
    "BBAS3",
    "ABEV3",
    "WEGE3",
    "MGLU3",
    "B3SA3",
    "SUZB3",
  ];

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      side: "BUY",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createOrder(data);
      toast.success("Ordem criada com sucesso");

      navigate("/orders");
    } catch (error) {
      toast.error(fmtAxiosMessage(error).description);
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>BASE Exchange - Nova Ordem</title>
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
              Crie uma nova ordem de compra ou venda
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

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Criar Nova Ordem
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <Controller
              name="instrument"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Instrumento" fullWidth>
                  {instruments.map((instrument) => (
                    <MenuItem key={instrument} value={instrument}>
                      {instrument}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="side"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Lado" fullWidth>
                  <MenuItem value="BUY">🟢 Compra</MenuItem>
                  <MenuItem value="SELL">🔴 Venda</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Preço"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Quantidade"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                  fullWidth
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || isCreating}
            >
              {!isSubmitting && !isCreating && <span>Enviar</span>}
              {(isSubmitting || isCreating) && <CircularProgress size={26} />}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Fragment>
  );
}
