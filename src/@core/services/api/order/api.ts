import { OrderListParams } from "@core/hooks/api/types";
import { api } from "../client";
import { List, Order, OrderHistory, PostOrder } from "./types";

export const orderService = {
  create: async (data: PostOrder): Promise<Order> => {
    const res = await api.post<Order>("/orders", data);
    return res.data;
  },

  get: async (id: string): Promise<Order> => {
    const res = await api.get<Order>(`/orders/${id}`);
    return res.data;
  },

  list: async (params?: OrderListParams): Promise<List<Order>> => {
    const res = await api.get<List<Order>>("/orders", { params });
    return res.data;
  },

  cancel: async (id: string): Promise<Order> => {
    const res = await api.patch<Order>(`/orders/${id}/cancel`);
    return res.data;
  },

  history: async (orderId: string): Promise<OrderHistory[]> => {
    const res = await api.get<OrderHistory[]>(`/orders/${orderId}/history`);
    return res.data;
  },
};
