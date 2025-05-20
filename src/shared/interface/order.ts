export interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postal_code: string;
}

export interface OrderData {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: string;
  total: number;
  created_at: string;
  items: OrderItem[];
  shipping_address: ShippingAddress;
}

export interface OrderStore {
  show: boolean;
  orders: OrderData[];
  filteredOrders: OrderData[];
  orderId: string;
  status: "Pending" | "Completed" | "Cancelled" | "All";
  selectedOrder: OrderData | null;
  actions: {
    setShow: (show: boolean) => void;
    setOrders: (orders: OrderData[]) => void;
    setFilteredOrders: (filteredOrders: OrderData[]) => void;
    setOrderId: (orderId: string) => void;
    setStatus: (status: "Pending" | "Completed" | "Cancelled" | "All") => void;
    setSelectedOrder: (order: OrderData | null) => void;
  };
}
