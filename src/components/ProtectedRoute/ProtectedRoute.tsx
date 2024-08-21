import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { decryptData } from '../../utils/helper';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = decryptData(localStorage.getItem('token') || '');
    return isAuthenticated === 'gotipriyal@1996.gmail.com' ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
