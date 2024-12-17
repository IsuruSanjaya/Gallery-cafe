import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('role'); // Check if role exists (or use your own condition)

    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
