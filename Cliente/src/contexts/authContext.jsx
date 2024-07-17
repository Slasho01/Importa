import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { loginService, logoutService } from '../services/authServices';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('token') || null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isTokenExpired = (token) => {
        if (!token) return true;
        const { exp } = jwtDecode(token);
        return Date.now() >= exp * 1000;
    };

    const initializeAuth = () => {
        const storedToken = Cookies.get('token');
        if (storedToken && !isTokenExpired(storedToken)) {
            setToken(storedToken);
            setIsAuthenticated(true);
        } else {
            setToken(null);
            setIsAuthenticated(false);
            Cookies.remove('token');
        }
    };

    useEffect(() => {
        initializeAuth(); // Verificar token al cargar el componente
    }, []);

    const login = async (username, password) => {
        setError(null);
        try {
            const data = await loginService(username, password);
            const { token } = data;
            const expirationDate = new Date(jwtDecode(token).exp * 1000);
            Cookies.set('token', token, { expires: expirationDate });
            setToken(token);
            setIsAuthenticated(true);
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed');
        }
    };

    const logout = () => {
        logoutService();
        Cookies.remove('token');
        setToken(null);
        setIsAuthenticated(false);
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
