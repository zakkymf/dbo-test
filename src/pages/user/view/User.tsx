import { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";

import { useUserController } from "../controller/useUserController";

function User() {
  const {
    users,
    selectedUser,
    getUsers,
    onSelectUser,
    showUserModal,
    hideUserModal,
    showModal,
  } = useUserController();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    getUsers();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row align-items-center mx-2 gap-3">
        <div className="d-flex flex-column me-3">
          <label className="mb-2" htmlFor="search-phone">
            Cari No. HP
          </label>
          <Form>
            <Form.Control type="text" placeholder="Cari No. HP" />
          </Form>
        </div>

        <div className="d-flex flex-column me-3" style={{ width: "250px" }}>
          <label className="mb-2" htmlFor="role">
            Role
          </label>
          <Form.Select aria-label="Default select example">
            <option>Pilih Role</option>
            <option value="Customer">Customer</option>
            <option value="Supplier">Supplier</option>
          </Form.Select>
        </div>
      </div>

      <div className="mt-4 w-100 d-flex">
        <Button variant="primary">Terapkan Filter</Button>
      </div>

      <div className="mt-4">
        <h5 className="mb-3">Daftar User</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Customer</th>
              <th>Role</th>
              <th>Email</th>
              <th>No. HP</th>
              <th>Tanggal Registrasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {new Date(user.registered_at).toLocaleString("id-ID")}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        onSelectUser(user);
                        showUserModal();
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

      <Modal show={showModal} onHide={hideUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-2">
            <div>
              <p className="fw-bold">Nama Customer</p>
              <p>{selectedUser?.name}</p>
            </div>
            <div>
              <p className="fw-bold">Role</p>
              <p>{selectedUser?.role}</p>
            </div>
            <div>
              <p className="fw-bold">Email</p>
              <p>{selectedUser?.email}</p>
            </div>
            <div>
              <p className="fw-bold">No. HP</p>
              <p>{selectedUser?.phone}</p>
            </div>
            <div>
              <p className="fw-bold">Tanggal Registrasi</p>
              <p>
                {new Date(selectedUser?.registered_at || "").toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default User;
