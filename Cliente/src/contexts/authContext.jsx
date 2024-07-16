import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loginService, logoutService } from '../services/authServices'; // Importa el servicio de autenticación
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Nuevo estado para indicar si el usuario está autenticado

    const isTokenExpired = (token) => {
        if (!token) return true;
        const { exp } = jwtDecode(token);
        return Date.now() >= exp * 1000;
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !isTokenExpired(storedToken)) {
            setToken(storedToken);
            setIsAuthenticated(true); // Establecer isAuthenticated a true si hay un token válido
        } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false); // Establecer isAuthenticated a false si no hay un token válido
        }
    }, []);

    const login = async (username, password) => {
        setError(null);
        try {
            const data = await loginService(username, password);
            const { token } = data;
            localStorage.setItem('token', token);
            setToken(token);
            setIsAuthenticated(true); // Establecer isAuthenticated a true después de un inicio de sesión exitoso
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed');
        }
    };

    const logout = () => {
        logoutService();
        setToken(null);
        setIsAuthenticated(false); // Establecer isAuthenticated a false al cerrar sesión
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
        <AuthContext.Provider value={{ token, error, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;