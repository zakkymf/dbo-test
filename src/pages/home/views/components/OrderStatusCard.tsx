import React from "react";
import { Card } from "react-bootstrap";
import { statusStyleMap } from "../../../../shared/utils";

interface OrderStatusCardProps {
  status: "Pending" | "Completed" | "Cancelled";
  amount: number;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({
  status,
  amount,
}) => {
  const { background, textColor } = statusStyleMap[status];

  return (
    <Card
      style={{
        backgroundColor: background,
        color: textColor,
        borderRadius: "12px",
        cursor: "pointer",
      }}
      className="text-center p-3 mb-3 hover-scale"
    >
      <Card.Body>
        <Card.Title style={{ fontWeight: 600, fontSize: "1.1rem" }}>
          {status}
        </Card.Title>
        <Card.Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {amount} Order
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default OrderStatusCard;
