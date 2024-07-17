import axios from 'axios';
import getUserIdFromToken from '../utils/jwtToken'; // Ajusta la ruta según donde tengas definida la función
import { loginService, logoutService } from '../services/authServices';
import { setCookie, removeCookie } from '../utils/lsc'; 
export const GET_USERINFO = 'GET_USERINFO'; // Ajusta la importación del tipo de acción según tu implementación
export const POST_USERINFO = 'POST_USERINFO';
export const PUT_USERINFO = 'PUT_USERINFO';
export const GET_BILLINGINFO = 'GET_BILLINGINFO';
export const POST_BILLINGINFO = 'POST_BILLINGINFO';
export const PUT_BILLINGINFO = 'PUT_BILLINGINFO';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
import api from '../utils/axiosConfig';


export const login = (username, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const data = await loginService(username, password);
        dispatch({ type: LOGIN_SUCCESS, payload: data });

        // Guarda los tokens en cookies
        setCookie('token', data.token);
        setCookie('refreshToken', data.refreshToken);

        // Guarda los tokens en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

export const logout = () => (dispatch) => {
    logoutService();
    dispatch({ type: LOGOUT });

    // Elimina los tokens de las cookies
    removeCookie('token');
    removeCookie('refreshToken');

    // Elimina los tokens del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
};

export const getUserInfoById = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const userId = await getUserIdFromToken();
        if (!userId) {
            console.error('No se pudo obtener el ID del usuario');
            return;
        }
        if (!token) {
            throw new Error('Token de sesión no disponible');
        }
        const response = await api.post(`userinfo/${userId}`, { userId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch({
            type: GET_USERINFO,
            payload: response.data
        });
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
};

export const postUserInfo = (data) => async (dispatch) => {
    const token = localStorage.getItem('token');
    console.log(token)
    try {
        const response = await api.post(`userinfo/`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type: POST_USERINFO,
            payload: response.data
        })
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
}

export const updateUserInfo = (data, Id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const response = await api.put(`userinfo/${Id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type: PUT_USERINFO,
            payload: response.data
        })
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
}

export const getUserBillingInfoById = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const userId = await getUserIdFromToken();
        if (!userId) {
            console.error('No se pudo obtener el ID del usuario');
            return;
        }
        if (!token) {
            throw new Error('Token de sesión no disponible');
        }
        const response = await api.post(`facturacion/${userId}`, { userId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch({
            type: GET_BILLINGINFO,
            payload: response.data
        });
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
};

export const postUserBilling = (data) => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const response = await api.post('facturacion', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type: POST_BILLINGINFO,
            payload: response.data
        })
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
}

export const updateUserBillingInfo = (data, Id) => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        const responseb = await api.put(`facturacion/${Id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type: PUT_BILLINGINFO,
            payload: responseb.data
        })
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
}