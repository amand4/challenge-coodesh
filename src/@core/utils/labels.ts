import { ThemeColor } from "layouts/types";

export interface LabelObj {
  [key: string]: {
    label: string;
    color: ThemeColor;
  };
}
export const ordersTypes: LabelObj = {
  OPEN: { label: "Aberto", color: "warning" },
  EXECUTED: { label: "Executado", color: "success" },
  PARTIAL: { label: "Parcial", color: "info" },
  CANCELLED: { label: "Cancelado", color: "error" },
};

export const sidesTypes: LabelObj = {
  BUY: { label: "Compra", color: "error" },
  SELL: { label: "Venda", color: "error" },
};
