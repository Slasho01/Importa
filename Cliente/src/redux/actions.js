import axios from 'axios';
import getUserIdFromToken from '../utils/jwtToken'; // Ajusta la ruta según donde tengas definida la función
import { loginService, logoutService } from '../services/authServices';
import { setCookie, removeCookie, getCookie } from '../utils/lsc'; 
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
export const GET_PREALERTAS = 'GET_PREALERTAS';
export const GET_PREALERTADETAILS = 'GET_PREALERTADETAILS';
export const POST_PREALERTA = 'POST_PREALERTA';
export const PUT_PREALERTA = 'PUT_PREALERTA';
import api from '../utils/axiosConfig';


export const login = (username, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const data = await loginService(username, password);
        dispatch({ type: LOGIN_SUCCESS, payload: data });

        // Guarda los tokens cifrados en cookies
        setCookie('token', data.token);
        setCookie('refreshToken', data.refreshToken);

        // Opcional: Guarda los tokens en localStorage
    } catch (error) { 
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
};

export const logout = () => (dispatch) => {
    logoutService();
    dispatch({ type: LOGOUT });
    removeCookie('token');
    removeCookie('refreshToken');
};

export const getUserInfoById = () => async (dispatch) => {
    const token = getCookie('token')
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
    const token = getCookie('token')
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
    const token = getCookie('token')
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
    const token = getCookie('token')
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
    const token = getCookie('token')
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
    const token = getCookie('token')
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

export const getPreAlertas = () => async (dispatch) => {
    const token = getCookie('token')
    try {
        const userId = await getUserIdFromToken();
        if (!userId) {
            console.error('No se pudo obtener el ID del usuario');
            return;
        }
        if (!token) {
            throw new Error('Token de sesión no disponible');
        }
        const response = await api.post(`prealertas`, { userId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch({
            type: GET_PREALERTAS,
            payload: response.data
        });
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
}

export const getPreAlertasById = (id) => async(dispatch) =>{
    const token = getCookie('token');
    try {
        if(!token){
            throw new Error('Token de sessión no disponible');
        }
        const response = await api.get(`prealertas/${id}`, {
                headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch({
            type: GET_PREALERTADETAILS,
            payload: response.data
        })
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
}

export const postPreAlerta = (data) => async(dispatch) =>{
    const token = getCookie('token');
    try {
        if(!token){
            throw new Error('Token de sessión no disponible');
        }
        const response = await api.post(`prealertas/post`, data, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch({
            type: POST_PREALERTA,
            payload: response.data
        })
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
}

export const putPreAlerta = (data, id) => async(dispatch) => {
    const token = getCookie('token')
    try {
        const response = await api.put(`prealertas/${id}`, data, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type: PUT_PREALERTA,
            payload: response.data
        })
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
}