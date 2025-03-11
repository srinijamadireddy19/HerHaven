<<<<<<< HEAD
import { createContext, useContext, useReducer } from "react"
import React from 'react'
import authReducer from "../reducer/authReducer";


export const AuthContext = createContext();

export  const AuthProvider = ({children}) =>  {
    const initialState = { isAuthenticated: false, user: null };
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (user) => dispatch({ type: "LOGIN", payload: user });
    const updateProfile = (user) => dispatch({ type: "UPDATE", payload: user });
    const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

=======
import { createContext, useContext, useReducer } from "react"
import React from 'react'
import authReducer from "../reducer/authReducer";


export const AuthContext = createContext();

export  const AuthProvider = ({children}) =>  {
    const initialState = { isAuthenticated: false, user: null };
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (user) => dispatch({ type: "LOGIN", payload: user });
    const updateProfile = (user) => dispatch({ type: "UPDATE", payload: user });
    const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ state, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

>>>>>>> a7a5ac24d79e247fd1326e8fd049e3b6ab827e35
export const useAuth = () => useContext(AuthContext);