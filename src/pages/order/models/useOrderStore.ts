import { create } from "zustand";
import type { OrderStore } from "../../../shared/interface";

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  show: false,
  selectedOrder: null,
  orderId: "",
  status: "All",
  filteredOrders: [],
  setOrders: (orders) => set({ orders }),
  setShow: (show) => set({ show }),
  setSelectedOrder: (selectedOrder) => set({ selectedOrder }),
  setOrderId: (orderId) => set({ orderId }),
  setStatus: (status) => set({ status }),
  setFilteredOrders: (filteredOrders) => set({ filteredOrders }),

  filterOrders: () => {
    const { orderId, status, orders } = get();
    const filteredOrder = orders.filter((order) => {
      const matchId = orderId
        ? order.id.toLowerCase().includes(orderId.toLowerCase())
        : true;

      const matchStatus =
        status && status !== "All"
          ? order.status.toLowerCase() === status.toLowerCase()
          : true;

      return matchId && matchStatus;
    });

    set({ filteredOrders: filteredOrder });
  },
  resetFilter: () => {
    const { setOrderId, setStatus } = get();
    setOrderId("");
    setStatus("All");
    set({ filteredOrders: get().orders });
  },
}));
