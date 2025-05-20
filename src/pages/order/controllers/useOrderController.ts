/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { dummyOrders } from "../../../shared/constant";
import { ENDPOINT } from "../../../shared/constant/endpoint";
import type { OrderData } from "../../../shared/interface";
import { httpClient } from "../../../shared/libraries";
import { useOrderStore } from "../models/useOrderStore";

export const useOrderController = () => {
  const {
    orders,
    show,
    orderId,
    status,
    selectedOrder,
    filteredOrders,

    setOrders,
    setShow,
    setSelectedOrder,
    setOrderId,
    setStatus,
    setFilteredOrders,
    filterOrders,
    resetFilter,
  } = useOrderStore();

  const getOrders = async () => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(dummyOrders);
        }, 500);
      });
      setOrders(response as OrderData[]);
      setFilteredOrders(response as OrderData[]);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderById = async (id: string) => {
    try {
      const response = await httpClient.get(ENDPOINT.ORDER + `/${id}`);
      setSelectedOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectOrder = useCallback(
    (order: OrderData) => {
      setSelectedOrder(order);
    },
    [selectedOrder]
  );

  const showOrderModal = useCallback(() => {
    setShow(true);
  }, [show]);

  const hideOrderModal = useCallback(() => {
    setShow(false);
    setSelectedOrder(null);
  }, [show]);

  return {
    orders,
    show,
    selectedOrder,
    orderId,
    status,
    filteredOrders,
    getOrders,
    getOrderById,
    showOrderModal,
    hideOrderModal,
    onSelectOrder,
    setOrderId,
    setStatus,
    filterOrders,
    resetFilter,
  };
};
