/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo, useState } from "react";
import { dummyOrders } from "../../../shared/constant";
import type { OrderData } from "../../../shared/interface";
import { useOrderStore } from "../models/useOrderStore";
import { orderService } from "../services/orderService";

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const isFilteringActive = orderId !== "" || status !== "All";
  const data = isFilteringActive ? filteredOrders : orders;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage]);

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
      const response = await orderService.getOrderById(id);
      setSelectedOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async (order: OrderData) => {
    try {
      const response = await orderService.createOrder(order);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrder = async (id: string, order: OrderData) => {
    try {
      const response = await orderService.updateOrder(id, order);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const response = await orderService.deleteOrder(id);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectOrder = useCallback((order: OrderData) => {
    setSelectedOrder(order);
  }, []);

  const showOrderModal = useCallback(() => {
    setShow(true);
  }, []);

  const hideOrderModal = useCallback(() => {
    setShow(false);
    setSelectedOrder(null);
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
    orders,
    show,
    selectedOrder,
    orderId,
    status,
    filteredOrders,
    currentPage,
    totalPages,
    currentOrders,
    setCurrentPage,
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    showOrderModal,
    hideOrderModal,
    onSelectOrder,
    setOrderId,
    setStatus,
    filterOrders,
    resetFilter,
    handlePageChange,
  };
};
