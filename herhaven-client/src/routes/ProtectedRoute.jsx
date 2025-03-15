
import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({children}) => {
    const { state } = useAuth();
    return state.isAuthenticated ? children : <Navigate to="/login" />;
}

