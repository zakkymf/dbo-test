import { create } from "zustand";
import type { UserStore } from "../../../shared/interface";

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  showModal: false,
  selectedUser: null,
  userId: "",
  filteredUsers: [],
  role: "",
  actions: {
    setUsers: (users) => set({ users }),
    setUserId: (userId) => set({ userId }),
    setRole: (role) => set({ role }),
    setFilteredUsers: (filteredUsers) => set({ filteredUsers }),
    setSelectedUser: (user) => set({ selectedUser: user }),
    setShowModal: (showModal) => set({ showModal }),
  },
}));
