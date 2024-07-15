import axios from 'axios';
import getUserIdFromToken from '../utils/jwtToken'; // Ajusta la ruta según donde tengas definida la función
export const GET_USERINFO = 'GET_USERINFO'; // Ajusta la importación del tipo de acción según tu implementación
import api from '../utils/axiosConfig';

export const getUserInfoById = () => async (dispatch) => {
    const userId = await getUserIdFromToken(); // Llama a la función para obtener el ID de usuario desde el token
    if (!userId) {
        console.error('No se pudo obtener el ID del usuario');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token de sesión no disponible');
        }
        const response = await api.post(`userinfo/${userId}`, { userId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
        dispatch({
            type: GET_USERINFO,
            payload: response.data
        });
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
};
