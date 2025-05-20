export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Customer" | "Supplier";
  address: string;
  registered_at: string;
}

export interface UserStore {
  showModal: boolean;
  users: UserData[];
  userId: string;
  role: string;
  filteredUsers: UserData[];
  selectedUser: UserData | null;

  setUsers: (users: UserData[]) => void;
  setUserId: (userId: string) => void;
  setRole: (role: string) => void;
  setFilteredUsers: (filteredUsers: UserData[]) => void;
  setSelectedUser: (user: UserData | null) => void;
  setShowModal: (showModal: boolean) => void;
  filterUsers: () => void;
  resetFilter: () => void;
}
