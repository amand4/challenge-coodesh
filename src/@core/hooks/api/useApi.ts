import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@core/services/api/apiClient";

import { queryKeys } from "./queryKeys";
import {
  List,
  Order,
  OrderHistory,
  PostOrder,
} from "@core/services/api/order/types";

interface UseQueryOptions {
  enabled?: boolean;
  refetchInterval?: number | false | ((query: unknown) => number | false);
}

export const usePostOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, PostOrder>({
    mutationFn: (data) => apiClient.order.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.order.all });
    },
  });
};

export const useGetOrder = (
  id: string | undefined,
  options?: UseQueryOptions,
) => {
  return useQuery<Order>({
    queryKey: queryKeys.order.detail(id!),
    queryFn: () => apiClient.order.get(id!),
    enabled: !!id && options?.enabled !== false,
  });
};

export const useGetOrders = (
  params?: Record<string, unknown>,
  options?: UseQueryOptions,
) => {
  return useQuery<List<Order>>({
    queryKey: queryKeys.order.list(params),
    queryFn: () => apiClient.order.list(params),
    enabled: options?.enabled !== false,
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, { id: string }>({
    mutationFn: ({ id }) => apiClient.order.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.order.all });
    },
  });
};

export const useGetOrderHistory = (
  id: string | undefined,
  options?: UseQueryOptions,
) => {
  return useQuery<OrderHistory[]>({
    queryKey: queryKeys.order.history(id!),
    queryFn: () => apiClient.order.history(id!),
    enabled: !!id && options?.enabled !== false,
  });
};
