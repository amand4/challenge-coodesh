import { OrderListParams } from "./types";

export const queryKeys = {
  order: {
    all: ["order"] as const,
    lists: () => [...queryKeys.order.all, "list"] as const,
    list: (params?: OrderListParams) =>
      [...queryKeys.order.lists(), params] as const,
    details: () => [...queryKeys.order.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.order.details(), id] as const,
    history: (id: string) => [...queryKeys.order.all, "history", id] as const,
  },
};
