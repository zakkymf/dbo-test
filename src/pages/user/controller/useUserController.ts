/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
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

  const onSelectUser = useCallback(
    (user: UserData) => {
      setSelectedUser(user);
    },
    [selectedUser]
  );

  const showUserModal = useCallback(() => {
    setShowModal(true);
  }, [showModal]);

  const hideUserModal = useCallback(() => {
    setShowModal(false);
    setSelectedUser(null);
  }, [showModal]);

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
