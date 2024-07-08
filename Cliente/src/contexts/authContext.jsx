// src/contexts/AuthContext.js

import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loginService, logoutService } from '../services/authServices'; // Importa el servicio de autenticación

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    const isTokenExpired = (token) => {
        if (!token) return true;
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return Date.now() >= exp * 1000;
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !isTokenExpired(storedToken)) {
            setToken(storedToken);
        } else {
            localStorage.removeItem('token');
        }
    }, []);

    const login = async (username, password) => {
        setError(null);
        try {
            const data = await loginService(username, password);
            const { token } = data;
            localStorage.setItem('token', token);
            setToken(token);
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed');
        }
    };

    const logout = () => {
        logoutService();
        setToken(null);
    };

    useEffect(() => {
        if (token) {
            const tokenCheckInterval = setInterval(() => {
                if (isTokenExpired(token)) {
                    logout();
                }
            }, 1000 * 60); // Verifica cada minuto

            return () => clearInterval(tokenCheckInterval);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
