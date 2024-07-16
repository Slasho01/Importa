import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const PrivateRoute = ({ children }) => {
    const {isAuthenticated} = useAuth() // isauth() returns true or false based on localStorage
    console.log(isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;