import axios from 'axios';
import { getCookie, setCookie, removeCookie } from './lsc'; // Ajusta la ruta según donde tengas definidas las funciones

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true, // Permite el envío de cookies desde el cliente al servidor
});

api.interceptors.request.use(
    (config) => {
        const token = getCookie('token'); // Obtén el token desde la cookie
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = getCookie('refreshToken'); // Obtén el refreshToken desde la cookie

            if (refreshToken) {
                try {
                    const response = await api.post('/refresh-token', { refreshToken }, {
                        withCredentials: true, // Asegúrate de enviar las cookies en la solicitud de refresco
                    });
                    const { token } = response.data;
                    setCookie('token', token); // Guarda el nuevo token en la cookie
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    return api(originalRequest);
                } catch (error) {
                    // Manejo de errores: redirigir al usuario a la página de inicio de sesión, por ejemplo
                    removeCookie('token');
                    removeCookie('refreshToken');
                    window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
