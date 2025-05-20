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
    filteredUsers,
    role,
    userId,
    actions: {
      setUsers,
      setSelectedUser,
      setShowModal,
      setFilteredUsers,
      setUserId,
      setRole,
    },
  } = useUserStore();

  const getUsers = async () => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(dummyUsers);
        }, 500);
      });
      setUsers(response as UserData[]);
      setFilteredUsers(response as UserData[]);
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

  const filterUsers = useCallback(() => {
    const filteredUser = users.filter((user) => {
      const matchId = userId
        ? user.id.toLowerCase().includes(userId.toLowerCase())
        : true;

      const matchRole = role
        ? user.role.toLowerCase() === role.toLowerCase()
        : true;

      return matchId && matchRole;
    });

    setFilteredUsers(filteredUser);
  }, [userId, role, users]);

  const resetFilter = useCallback(() => {
    setUserId("");
    setRole("");
    setFilteredUsers(users);
  }, [users, setUserId, setRole, setFilteredUsers]);

  return {
    users,
    selectedUser,
    showModal,
    filteredUsers,
    role,
    userId,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    showUserModal,
    hideUserModal,
    onSelectUser,
    filterUsers,
    resetFilter,
    setUserId,
    setRole,
  };
};
