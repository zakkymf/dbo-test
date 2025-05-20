import { ENDPOINT } from "../../../shared/constant/endpoint";
import type { OrderData } from "../../../shared/interface";
import { httpClient } from "../../../shared/libraries";

export const orderService = {
  getOrders: async () => {
    const response = await httpClient.get(ENDPOINT.ORDER);
    return response.data;
  },
  getOrderById: async (id: string) => {
    const response = await httpClient.get(`${ENDPOINT.ORDER}/${id}`);
    return response.data;
  },
  createOrder: async (data: OrderData) => {
    const response = await httpClient.post(ENDPOINT.ORDER, data);
    return response.data;
  },
  updateOrder: async (id: string, data: OrderData) => {
    const response = await httpClient.put(`${ENDPOINT.ORDER}/${id}`, data);
    return response.data;
  },
  deleteOrder: async (id: string) => {
    const response = await httpClient.delete(`${ENDPOINT.ORDER}/${id}`);
    return response.data;
  },
};
