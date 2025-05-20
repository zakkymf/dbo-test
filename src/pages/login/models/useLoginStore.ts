import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { LoginStore } from "../../../shared/interface";

export const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      email: "admin@example.com",
      password: "123456",
      loginData: null,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setLoginData: (loginData) => set({ loginData }),
      login: (email, password) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const dummyEmail = "admin@example.com";
            const dummyPassword = "123456";

            if (email === dummyEmail && password === dummyPassword) {
              set({ isLoggedIn: true });
              resolve({
                success: true,
                data: { email, name: "John Doe", token: "abcdeeee" },
              });
            } else {
              reject({ success: false, message: "Email atau password salah" });
            }
          }, 1000);
        });
      },
      logout: () =>
        set({ isLoggedIn: false, email: "", password: "", loginData: null }),
    }),
    {
      name: "login-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
