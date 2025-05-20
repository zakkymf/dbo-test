import { Col, Row } from "react-bootstrap";
import { useLoginStore } from "../../login/model/useLoginStore";
import OrderStatusCard from "./components/OrderStatusCard";
import { useOrderController } from "../../order/controller/useOrderController";
import { useEffect } from "react";
import { useUserController } from "../../user/controller/useUserController";
import UserCard from "./components/UserCard";

function Home() {
  const { loginData } = useLoginStore();

  const { orders, getOrders } = useOrderController();
  const { users, getUsers } = useUserController();

  useEffect(() => {
    getOrders();
    getUsers();
  }, []);

  const countByStatus = (status: "Pending" | "Completed" | "Cancelled") => {
    return orders.filter((order) => order.status === status).length;
  };

  const countByRole = (role: "Customer" | "Supplier") => {
    return users.filter((user) => user.role === role).length;
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-column w-100">
        <h3>Selamat datang, {loginData?.name}</h3>
      </div>

      <div className="my-4">
        <h5>Total Order</h5>
        <Row className="g-3">
          <Col md={4}>
            <OrderStatusCard
              status="Pending"
              amount={countByStatus("Pending")}
            />
          </Col>
          <Col md={4}>
            <OrderStatusCard
              status="Completed"
              amount={countByStatus("Completed")}
            />
          </Col>
          <Col md={4}>
            <OrderStatusCard
              status="Cancelled"
              amount={countByStatus("Cancelled")}
            />
          </Col>
        </Row>
      </div>

      <div className="my-4">
        <h5>Total User</h5>
        <Row className="g-3">
          <Col md={4}>
            <UserCard role="Customer" amount={countByRole("Customer")} />
          </Col>
          <Col md={4}>
            <UserCard role="Supplier" amount={countByRole("Supplier")} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
