import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router";
import { useLoginController } from "../../pages/login/controllers/useLoginController";

interface SidebarProps {
  isOpen: boolean;
}

function Sidebar({ isOpen }: SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useLoginController();
  return (
    <div
      className="bg-light vh-100 p-3 border-end transition"
      style={{
        width: isOpen ? "250px" : "0",
        overflow: "hidden",
        transition: "width 0.3s",
      }}
    >
      <h4
        className="mb-4"
        style={{ opacity: isOpen ? 1 : 0, transition: "opacity 0.3s" }}
      >
        Depoguna Bangunan Online
      </h4>

      <Nav className="flex-column">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active text-primary fw-bold" : "text-dark"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/order"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active text-primary fw-bold" : "text-dark"}`
          }
        >
          Order
        </NavLink>
        <NavLink
          to="/user"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active text-primary fw-bold" : "text-dark"}`
          }
        >
          User
        </NavLink>
        <Nav.Item
          as="span"
          className="nav-link text-dark"
          style={{ cursor: "pointer" }}
          onClick={() => {
            logout();
            navigate("/login", { replace: true });
            localStorage.removeItem("login-storage");
          }}
        >
          Logout
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
