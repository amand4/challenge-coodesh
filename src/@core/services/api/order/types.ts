export type OrderSide = "BUY" | "SELL";

export type OrderStatus = "OPEN" | "PARTIAL" | "EXECUTED" | "CANCELLED";

export interface Order {
  id: string;
  instrument: string;
  side: OrderSide;
  price: number;
  quantity: number;
  remainingQuantity: number;
  status: OrderStatus;
  createdAt: string;
}

export interface PostOrder {
  instrument: string;
  side: OrderSide;
  price: number;
  quantity: number;
}

export interface List<Order> {
  items: Order[];
  total: number;
}

export interface OrderHistory {
  id: string;
  orderId: string;
  fromStatus: string | null;
  toStatus: string;
  timestamp: string;
}
