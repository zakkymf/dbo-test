import { dummyOrders } from "../../../shared/constant";
import { ENDPOINT } from "../../../shared/constant/endpoint";
import type { OrderData } from "../../../shared/interface";
import { httpClient } from "../../../shared/libraries";
import { useOrderStore } from "../model/useOrderStore";

export const useOrderController = () => {
  const {
    orders,
    show,
    selectedOrder,
    actions: { setOrders, setShow, setSelectedOrder },
  } = useOrderStore();

  const getOrders = async () => {
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(dummyOrders);
        }, 500);
      });
      setOrders(response as OrderData[]);
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

  const onSelectOrder = (order: OrderData) => {
    setSelectedOrder(order);
  };

  const showOrderModal = () => {
    setShow(true);
  };

  const hideOrderModal = () => {
    setShow(false);
    setSelectedOrder(null);
  };

  return {
    orders,
    show,
    selectedOrder,
    getOrders,
    getOrderById,
    showOrderModal,
    hideOrderModal,
    onSelectOrder,
  };
};
