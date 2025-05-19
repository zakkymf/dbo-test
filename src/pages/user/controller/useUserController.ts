import { ENDPOINT } from "../../../shared/constant/endpoint";
import { dummyUsers } from "../../../shared/constant/user";
import type { UserData } from "../../../shared/interface";
import { httpClient } from "../../../shared/libraries";
import { useUserStore } from "../model/useUserStore";

export const useUserController = () => {
  const {
    users,
    selectedUser,
    showModal,
    actions: { setUsers, setSelectedUser, setShowModal },
  } = useUserStore();

  const getUsers = async () => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(dummyUsers);
        }, 500);
      });
      setUsers(response as UserData[]);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (id: string) => {
    try {
      const response = await httpClient.get(ENDPOINT.USER + `/${id}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (user: UserData) => {
    try {
      const response = await httpClient.post(ENDPOINT.USER, user);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id: string, user: UserData) => {
    try {
      const response = await httpClient.put(ENDPOINT.USER + `/${id}`, user);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await httpClient.delete(ENDPOINT.USER + `/${id}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectUser = (user: UserData) => {
    setSelectedUser(user);
  };

  const showUserModal = () => {
    setShowModal(true);
  };

  const hideUserModal = () => {
    setShowModal(false);
  };

  return {
    users,
    selectedUser,
    showModal,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    showUserModal,
    hideUserModal,
    onSelectUser,
  };
};
