import { create } from "zustand";
import type { OrderStore } from "../../../shared/interface";

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  show: false,
  selectedOrder: null,
  orderId: "",
  status: "All",
  filteredOrders: [],
  actions: {
    setOrders: (orders) => set({ orders }),
    setShow: (show) => set({ show }),
    setSelectedOrder: (selectedOrder) => set({ selectedOrder }),
    setOrderId: (orderId) => set({ orderId }),
    setStatus: (status) => set({ status }),
    setFilteredOrders: (filteredOrders) => set({ filteredOrders }),
  },
}));
