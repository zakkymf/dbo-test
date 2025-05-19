/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import { useLoginStore } from "../model/useLoginStore";

export const useLoginController = () => {
  const {
    email,
    password,
    loginData,
    login,
    setEmail,
    setPassword,
    setLoginData,
    logout,
  } = useLoginStore();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      setLoginData(response.data);
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return {
    email,
    password,
    loginData,
    handleLogin,
    setEmail,
    setPassword,
    logout,
  };
};
