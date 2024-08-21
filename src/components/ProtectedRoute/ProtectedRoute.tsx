import React, { ReactNode, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { decryptData } from '../../utils/helper';
import { useAppSelector } from '../../utils/hooks';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const users = useAppSelector(state => state.user.users)

    // Decrypt the token and memoize it to avoid recalculating on every render
    const isAuthenticated = useMemo(() => decryptData(localStorage.getItem('token') || ''), []);


    const verifiedUser = users.find((item) => item.email === isAuthenticated);


    // If no user is verified, navigate to the signup page
    if (!verifiedUser) {
        return <Navigate to="/signin" />;
    }

    // If user is verified, render the children components
    return <>{children}</>;
};

export default ProtectedRoute;
