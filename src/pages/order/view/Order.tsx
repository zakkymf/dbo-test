import { useEffect, useState } from "react";
import { Badge, Button, Form, Table, Modal, Pagination } from "react-bootstrap";
import { formatCurrency } from "../../../shared/utils";
import { useOrderController } from "../controller/useOrderController";

function Order() {
  const {
    orders,
    show,
    selectedOrder,
    onSelectOrder,
    showOrderModal,
    hideOrderModal,
    getOrders,
  } = useOrderController();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    getOrders();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusVariant = (status: string | undefined) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Completed":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row align-items-center mx-2 gap-3">
        <div className="d-flex flex-column me-3">
          <label className="mb-2" htmlFor="search-order-id">
            Cari Order ID
          </label>
          <Form>
            <Form.Control type="text" placeholder="Cari Order ID" />
          </Form>
        </div>

        <div className="d-flex flex-column me-3" style={{ width: "250px" }}>
          <label className="mb-2" htmlFor="status">
            Status
          </label>
          <Form.Select aria-label="Default select example">
            <option>Pilih Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Canceled">Canceled</option>
          </Form.Select>
        </div>

        <div className="d-flex flex-column">
          <label className="mb-2" htmlFor="tanggal-transaksi">
            Tanggal Transaksi
          </label>
          <Form>
            <Form.Control type="text" placeholder="Tanggal Transaksi" />
          </Form>
        </div>
      </div>

      <div className="mt-4 w-100 d-flex">
        <Button variant="primary">Terapkan Filter</Button>
      </div>

      <div className="mt-4">
        <h5 className="mb-3">Daftar Order</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Nama Barang</th>
              <th>Email</th>
              <th>No. HP</th>
              <th>Status</th>
              <th>Total</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>
                    {order.items.map((item) => item.product_name).join(", ")}
                  </td>
                  <td>{order.customer_email}</td>
                  <td>{order.customer_phone}</td>
                  <td>
                    <Badge bg={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td>{formatCurrency(order.total)}</td>
                  <td>{new Date(order.created_at).toLocaleString("id-ID")}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        onSelectOrder(order);
                        showOrderModal();
                      }}
                    >
                      Lihat Detail
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      <div className="mt-4 w-100 d-flex justify-content-end">
        <Pagination>
          <Pagination.First
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>

      <Modal show={show} onHide={hideOrderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column">
              <p className="fw-bold">Nama Customer</p>
              <p>{selectedOrder?.customer_name}</p>
            </div>
            <div className="d-flex flex-column">
              <p className="fw-bold">Nama Barang</p>
              <p>
                {selectedOrder?.items
                  .map((item) => item.product_name)
                  .join(", ")}
              </p>
            </div>
            <div className="d-flex flex-column">
              <p className="fw-bold">Email</p>
              <p>{selectedOrder?.customer_email}</p>
            </div>
            <div className="d-flex flex-column">
              <p className="fw-bold">No. HP</p>
              <p>{selectedOrder?.customer_phone}</p>
            </div>
            <div className="d-flex flex-column">
              <p className="fw-bold">Alamat Pengiriman</p>
              <p>{`${selectedOrder?.shipping_address.address}, ${selectedOrder?.shipping_address.city}, ${selectedOrder?.shipping_address.postal_code}`}</p>
            </div>
            <div className="d-flex flex-column">
              <p className="fw-bold">Tanggal Transaksi</p>
              <p>
                {new Date(selectedOrder?.created_at || "").toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>
            <div className="d-flex flex-column">
              <p className="fw-bold">Status</p>
              <Badge bg={getStatusVariant(selectedOrder?.status)}>
                {selectedOrder?.status}
              </Badge>
            </div>
            <div className="d-flex flex-column">
              <p className="fw-bold">Total</p>
              <p>{formatCurrency(selectedOrder?.total || 0)}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Order;
