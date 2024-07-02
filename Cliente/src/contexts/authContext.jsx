import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = async (username, password) => {
        setError(null);  // Clear previous errors
        try {
            const response = await axios.post('http://localhost:3001/api/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setToken(token);
        } catch (error) {
            setError(error.response?.data?.error || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

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
