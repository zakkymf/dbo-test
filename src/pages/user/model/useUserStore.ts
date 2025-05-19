import { create } from "zustand";
import type { UserStore } from "../../../shared/interface";

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  showModal: false,
  selectedUser: null,
  actions: {
    setUsers: (users) => set({ users }),
    setSelectedUser: (user) => set({ selectedUser: user }),
    setShowModal: (showModal) => set({ showModal }),
  },
}));
