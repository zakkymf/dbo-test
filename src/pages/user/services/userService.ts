import { ENDPOINT } from "../../../shared/constant/endpoint";
import type { UserData } from "../../../shared/interface";
import { httpClient } from "../../../shared/libraries";

export const userService = {
  getUsers: async (params: {
    page: number;
    limit: number;
    userId: string;
    role: string;
  }) => {
    const response = await httpClient.get(
      `${ENDPOINT.USER}?page=${params.page}&limit=${params.limit}&userId=${params.userId}&role=${params.role}`
    );
    return response.data;
  },
  getUserById: async (id: string) => {
    const response = await httpClient.get(`${ENDPOINT.USER}/${id}`);
    return response.data;
  },
  createUser: async (data: UserData) => {
    const response = await httpClient.post(ENDPOINT.USER, data);
    return response.data;
  },
  updateUser: async (id: string, data: UserData) => {
    const response = await httpClient.put(`${ENDPOINT.USER}/${id}`, data);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await httpClient.delete(`${ENDPOINT.USER}/${id}`);
    return response.data;
  },
};
