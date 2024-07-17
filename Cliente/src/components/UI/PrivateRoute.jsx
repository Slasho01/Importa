import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    return isAuthenticated ? (
        <Route {...rest} element={<Component />} />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default PrivateRoute;
