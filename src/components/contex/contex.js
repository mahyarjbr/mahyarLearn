import { createContext } from "react";

export const contex = createContext({
  fullname: "",
  setFullname: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  policy: "",
  setPolicy: () => {},
  validator: null,
  handleLogin: () => {},
  handleRegister: () => {},
});
