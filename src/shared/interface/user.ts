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
  selectedUser: UserData | null;
  actions: {
    setUsers: (users: UserData[]) => void;
    setSelectedUser: (user: UserData | null) => void;
    setShowModal: (showModal: boolean) => void;
  };
}
