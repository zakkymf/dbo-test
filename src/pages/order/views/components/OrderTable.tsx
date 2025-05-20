import { Badge, Button } from "react-bootstrap";
import type { OrderData } from "../../../../shared/interface";
import { formatCurrency, getStatusVariant } from "../../../../shared/utils";
import React from "react";

interface OrderTableProps {
  data: OrderData;
  onClick: () => void;
}

function OrderTable({ data, onClick }: OrderTableProps) {
  return (
    <tr key={data.id}>
      <td>{data.id}</td>
      <td>{data.customer_name}</td>
      <td>{data.items.map((item) => item.product_name).join(", ")}</td>
      <td>{data.customer_email}</td>
      <td>{data.customer_phone}</td>
      <td>
        <Badge bg={getStatusVariant(data.status)}>{data.status}</Badge>
      </td>
      <td>{formatCurrency(data.total)}</td>
      <td>{new Date(data.created_at).toLocaleString("id-ID")}</td>
      <td>
        <Button size="sm" variant="secondary" onClick={onClick}>
          Lihat Detail
        </Button>
      </td>
    </tr>
  );
}

export default React.memo(OrderTable);
