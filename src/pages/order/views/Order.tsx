import { useEffect, useState } from "react";
import { Button, Form, Table, Modal, Pagination } from "react-bootstrap";
import { useOrderController } from "../controllers/useOrderController";
import OrderTable from "./components/OrderTable";
import OrderDetail from "./components/OrderDetail";

function Order() {
  const {
    orders,
    show,
    selectedOrder,
    orderId,
    status,
    filteredOrders,
    onSelectOrder,
    showOrderModal,
    hideOrderModal,
    getOrders,
    setOrderId,
    setStatus,
    filterOrders,
    resetFilter,
  } = useOrderController();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const isFilteringActive = status !== "All" || orderId !== "";
  const data = isFilteringActive ? filteredOrders : orders;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    getOrders();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row align-items-center mx-2 gap-3">
        <div className="d-flex flex-column me-3">
          <label className="mb-2" htmlFor="search-order-id">
            Cari Order ID
          </label>
          <Form>
            <Form.Control
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
                if (e.target.value === "") {
                  resetFilter();
                }
              }}
              type="text"
              placeholder="Cari Order ID"
            />
          </Form>
        </div>

        <div className="d-flex flex-column me-3" style={{ width: "250px" }}>
          <label className="mb-2" htmlFor="status">
            Status
          </label>
          <Form.Select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as "Pending" | "Completed" | "Cancelled" | "All"
              )
            }
            aria-label="Default select example"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </div>
      </div>

      <div className="mt-4 w-100 d-flex">
        <Button variant="primary" onClick={filterOrders}>
          Terapkan Filter
        </Button>
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
                <OrderTable
                  key={order?.id}
                  data={order}
                  onClick={() => {
                    onSelectOrder(order);
                    showOrderModal();
                  }}
                />
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
          <OrderDetail selectedData={selectedOrder} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Order;
