<<<<<<< HEAD
import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({children}) => {
    const { state } = useAuth();
    return state.isAuthenticated ? children : <Navigate to="/login" />;
}
=======
import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({children}) => {
    const { state } = useAuth();
    return state.isAuthenticated ? children : <Navigate to="/login" />;
}
>>>>>>> a7a5ac24d79e247fd1326e8fd049e3b6ab827e35
