/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { dummyOrders } from "../../../shared/constant";
import { ENDPOINT } from "../../../shared/constant/endpoint";
import type { OrderData } from "../../../shared/interface";
import { httpClient } from "../../../shared/libraries";
import { useOrderStore } from "../model/useOrderStore";

export const useOrderController = () => {
  const {
    orders,
    show,
    orderId,
    status,
    selectedOrder,
    filteredOrders,
    actions: {
      setOrders,
      setShow,
      setSelectedOrder,
      setOrderId,
      setStatus,
      setFilteredOrders,
    },
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

  const filterOrders = useCallback(() => {
    const filteredOrder = orders.filter((order) => {
      const matchId = orderId
        ? order.id.toLowerCase().includes(orderId.toLowerCase())
        : true;

      const matchStatus =
        status && status !== "All"
          ? order.status.toLowerCase() === status.toLowerCase()
          : true;

      return matchId && matchStatus;
    });

    setFilteredOrders(filteredOrder);
  }, [orderId, status, orders]);

  const resetFilter = useCallback(() => {
    setOrderId("");
    setStatus("All");
    setFilteredOrders(orders);
  }, [orders, setOrderId, setStatus, setFilteredOrders]);

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
