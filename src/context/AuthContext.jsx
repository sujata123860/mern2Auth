import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ childern }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token]);

  const login = (newToken) => setToken(newToken);
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {childern}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
