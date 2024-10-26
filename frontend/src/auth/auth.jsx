import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const login = (userId, username) => {
    setIsAuthenticated(true);
    setUserId(userId);
    setUsername(username);
  }
  
  const logout = () => {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout, userId, username}}>
      {children}
    </AuthContext.Provider>
  )
}