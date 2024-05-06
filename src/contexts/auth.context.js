import { createContext } from "react";

const authStatusContext = createContext({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
});

export default authStatusContext;
