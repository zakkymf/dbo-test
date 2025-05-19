export interface LoginStore {
  isLoggedIn: boolean;
  email: string;
  password: string;
  loginData: LoginData | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setLoginData: (loginData: LoginData) => void;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; data: LoginData }>;
  logout: () => void;
}

export interface LoginData {
  token: string;
  name: string;
  email: string;
}
