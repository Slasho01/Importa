// src/utils/axiosConfig.js

import axios from 'axios';

// Crear una instancia de Axios
const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

// Configurar el interceptor de request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Configurar el interceptor de response
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        console.log(originalRequest);
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const response = await api.post('/refresh-token', { refreshToken });
                    const { token } = response.data;
                    localStorage.setItem('token', token);
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    return api(originalRequest);
                } catch (error) {
                    // Fallback to logout if refresh token fails
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login'; // Redirect to login
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
