import { createContext, useContext, useReducer, useEffect } from "react";
import authReducer from "../reducer/authReducer";

export const AuthContext = createContext();

const initialState = JSON.parse(localStorage.getItem("authState")) || { 
    isAuthenticated: false, 
    user: null 
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        localStorage.setItem("authState", JSON.stringify(state));
    }, [state]);

    const login = (user) => dispatch({ type: "LOGIN", payload: user });
    const updateProfile = (user) => dispatch({ type: "UPDATE", payload: user });
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("authState");
    };

    return (
        <AuthContext.Provider value={{ state, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
