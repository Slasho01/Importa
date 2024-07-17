// src/services/authService.js

import api from '../utils/axiosConfig'; // Importa la instancia configurada de Axios
import { removeCookie } from '../utils/lsc'

const loginService = async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      return response.data; // Retorna los datos exitosos del inicio de sesión (por ejemplo, tokens)
    } catch (error) {
      throw error; // Lanza el error para manejarlo en el llamador (por ejemplo, en la acción Redux)
    }
  };

const logoutService = () => {
    removeCookie('token');
    removeCookie('refreshToken');
};

export { loginService, logoutService };
