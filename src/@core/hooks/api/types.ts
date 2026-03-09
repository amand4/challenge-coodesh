export interface OrderListParams {
  page?: number;
  limit?: number;
  id?: number;
  instrument?: string;
  status?: string;
  side?: string;
  createdAt?: string;
}
