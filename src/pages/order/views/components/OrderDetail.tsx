import { Badge } from "react-bootstrap";
import type { OrderData } from "../../../../shared/interface";
import { formatCurrency, getStatusVariant } from "../../../../shared/utils";
import React from "react";

interface OrderDetailProps {
  selectedData: OrderData | null;
}

function OrderDetail({ selectedData }: OrderDetailProps) {
  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex flex-column">
        <p className="fw-bold">Nama Customer</p>
        <p>{selectedData?.customer_name}</p>
      </div>
      <div className="d-flex flex-column">
        <p className="fw-bold">Nama Barang</p>
        <p>{selectedData?.items.map((item) => item.product_name).join(", ")}</p>
      </div>
      <div className="d-flex flex-column">
        <p className="fw-bold">Email</p>
        <p>{selectedData?.customer_email}</p>
      </div>
      <div className="d-flex flex-column">
        <p className="fw-bold">No. HP</p>
        <p>{selectedData?.customer_phone}</p>
      </div>
      <div className="d-flex flex-column">
        <p className="fw-bold">Alamat Pengiriman</p>
        <p>{`${selectedData?.shipping_address.address}, ${selectedData?.shipping_address.city}, ${selectedData?.shipping_address.postal_code}`}</p>
      </div>
      <div className="d-flex flex-column">
        <p className="fw-bold">Tanggal Transaksi</p>
        <p>
          {new Date(selectedData?.created_at || "").toLocaleString("id-ID")}
        </p>
      </div>
      <div className="d-flex flex-column">
        <p className="fw-bold">Status</p>
        <Badge bg={getStatusVariant(selectedData?.status)}>
          {selectedData?.status}
        </Badge>
      </div>
      <div className="d-flex flex-column">
        <p className="fw-bold">Total</p>
        <p>{formatCurrency(selectedData?.total || 0)}</p>
      </div>
    </div>
  );
}

export default React.memo(OrderDetail);
