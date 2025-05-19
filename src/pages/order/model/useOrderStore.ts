import { create } from "zustand";
import type { OrderStore } from "../../../shared/interface";

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  show: false,
  selectedOrder: null,
  actions: {
    setOrders: (orders) => set({ orders }),
    setShow: (show) => set({ show }),
    setSelectedOrder: (selectedOrder) => set({ selectedOrder }),
  },
}));
