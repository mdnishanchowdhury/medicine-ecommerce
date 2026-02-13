// types/order.ts
export interface Medicine {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  medicine: Medicine;
}

export interface Order {
  id: string;
  status: string;
  totalAmount: number;
  shippingAddress: string;
  phoneNumber: string;
  createdAt: string;
  orderItems: OrderItem[];
}

export type OrderStatus = "PLACED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";