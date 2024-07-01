import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/login', { username, password });
            const token = response.data.token;
            setToken(token);
            // Guardar el token en localStorage o en una cookie si es necesario para mantener la sesión
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const logout = () => {
        setToken(null);
        // Limpiar localStorage o cookie cuando el usuario cierre sesión
    };

    return (
        <AuthContext.Provider value={{ token, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};