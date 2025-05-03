import { createContext, useContext, useReducer } from "react";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import authReducer from "../reducer/authReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const initialState = {
    isAuthenticated: !!storedUser,
    user: storedUser
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => dispatch({ type: "LOGIN", payload: user });
  const updateProfile = (user) => dispatch({ type: "UPDATE", payload: user });

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
