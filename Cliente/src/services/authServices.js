// src/services/authService.js

import api from '../utils/axiosConfig'; // Importa la instancia configurada de Axios

const loginService = async (username, password) => {
    const response = await api.post('/login', { username, password });
    return response.data;
};

const logoutService = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
};

export { loginService, logoutService };
