// src/services/authService.js

import api from '../utils/axiosConfig'; // Importa la instancia configurada de Axios
import { removeCookie } from '../utils/lsc'

const loginService = async (username, password) => {
    const response = await api.post('/login', { username, password });
    return response.data;
};

const logoutService = () => {
    removeCookie('token');
    removeCookie('refreshToken');
};

export { loginService, logoutService };
