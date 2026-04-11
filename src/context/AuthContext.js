import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("ll_token") || null);
  const [username, setUsername] = useState(() => localStorage.getItem("ll_username") || null);

  const login = (tok, user) => {
    localStorage.setItem("ll_token", tok);
    localStorage.setItem("ll_username", user);
    setToken(tok);
    setUsername(user);
  };

  const logout = () => {
    localStorage.removeItem("ll_token");
    localStorage.removeItem("ll_username");
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
