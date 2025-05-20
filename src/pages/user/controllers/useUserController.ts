/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useState } from "react";
import { ENDPOINT } from "../../../shared/constant/endpoint";
import { dummyUsers } from "../../../shared/constant/user";
import type { UserData } from "../../../shared/interface";
import { httpClient } from "../../../shared/libraries";
import { useUserStore } from "../models/useUserStore";

export const useUserController = () => {
  const {
    userId,
    role,
    filteredUsers,
    users,

    setUsers,
    setSelectedUser,
    setShowModal,
    setFilteredUsers,
  } = useUserStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const isFilteringActive = userId !== "" || role !== "";
  const data = isFilteringActive ? filteredUsers : users;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage]);

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

  const onSelectUser = useCallback((user: UserData) => {
    setSelectedUser(user);
  }, []);

  const showUserModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const hideUserModal = useCallback(() => {
    setShowModal(false);
    setSelectedUser(null);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) page = 1;
      else if (page > totalPages) page = totalPages;
      setCurrentPage(page);
    },
    [totalPages]
  );

  return {
    currentUsers,
    currentPage,
    totalPages,
    setCurrentPage,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    showUserModal,
    hideUserModal,
    onSelectUser,
    handlePageChange,
  };
};
