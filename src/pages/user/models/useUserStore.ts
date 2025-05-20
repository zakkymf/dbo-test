import { create } from "zustand";
import type { UserStore } from "../../../shared/interface";

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  showModal: false,
  selectedUser: null,
  userId: "",
  filteredUsers: [],
  role: "",

  setUsers: (users) => set({ users }),
  setUserId: (userId) => set({ userId }),
  setRole: (role) => set({ role }),
  setFilteredUsers: (filteredUsers) => set({ filteredUsers }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setShowModal: (showModal) => set({ showModal }),
  filterUsers: () => {
    const { userId, role, users } = get();
    const filteredUser = users.filter((user) => {
      const matchId = userId
        ? user.id.toLowerCase().includes(userId.toLowerCase())
        : true;

      const matchRole = role
        ? user.role.toLowerCase() === role.toLowerCase()
        : true;

      return matchId && matchRole;
    });

    set({ filteredUsers: filteredUser });
  },
  resetFilter: () => {
    const { setUserId, setRole } = get();
    setUserId("");
    setRole("");
    set({ filteredUsers: get().users });
  },
}));
