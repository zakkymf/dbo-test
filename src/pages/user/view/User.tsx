import { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";

import { useUserController } from "../controller/useUserController";
import UserTable from "./components/UserTable";
import UserDetail from "./components/UserDetail";

function User() {
  const {
    users,
    selectedUser,
    showModal,
    role,
    userId,
    filteredUsers,
    getUsers,
    onSelectUser,
    showUserModal,
    hideUserModal,
    filterUsers,
    resetFilter,
    setUserId,
    setRole,
  } = useUserController();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const isFilteringActive = userId !== "" || role !== "";
  const data = isFilteringActive ? filteredUsers : users;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = data.slice(indexOfFirstItem, indexOfLastItem);

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
            Cari User ID
          </label>
          <Form>
            <Form.Control
              type="text"
              placeholder="Cari User ID"
              value={userId}
              onChange={(e) => {
                if (e.target.value === "") {
                  resetFilter();
                }
                setUserId(e.target.value);
              }}
            />
          </Form>
        </div>

        <div className="d-flex flex-column me-3" style={{ width: "250px" }}>
          <label className="mb-2" htmlFor="role">
            Role
          </label>
          <Form.Select
            aria-label="Pilih Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Pilih Role</option>
            <option value="Customer">Customer</option>
            <option value="Supplier">Supplier</option>
          </Form.Select>
        </div>
      </div>

      <div className="mt-4 w-100 d-flex">
        <Button variant="primary" onClick={filterUsers}>
          Terapkan Filter
        </Button>
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
                <UserTable
                  key={user?.id}
                  user={user}
                  onClick={() => {
                    onSelectUser(user);
                    showUserModal();
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

      <Modal show={showModal} onHide={hideUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detail User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserDetail selectedUser={selectedUser} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default User;
