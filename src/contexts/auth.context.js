import { createContext } from "react";

const authStatusContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export default authStatusContext;
