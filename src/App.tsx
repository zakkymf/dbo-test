import { Routes, Route, useLocation, useNavigate } from "react-router";

import Login from "./pages/login/views/Login";
import { useEffect, useState } from "react";
import "./App.css";
import SideBar from "./shared/components/SideBar";
import Order from "./pages/order/views/Order";
import User from "./pages/user/views/User";
import { useLoginStore } from "./pages/login/models/useLoginStore";
import Home from "./pages/home/views/Home";

function App() {
  const [isOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";
  const { isLoggedIn } = useLoginStore();

  useEffect(() => {
    if (!isLoggedIn && !isLoginPage) {
      navigate("/login", { replace: true });
    }

    document.title = "Admin Dashboard";
  }, [isLoggedIn]);

  return (
    <div className="d-flex">
      {!isLoginPage && isLoggedIn && <SideBar isOpen={isOpen} />}

      <div
        style={{
          flex: 1,
          transition: "margin-left 0.3s",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
