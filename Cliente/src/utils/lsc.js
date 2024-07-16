import Cookies from 'js-cookie';

const COOKIE_NAME = 'auth_token';

export const setCookie = (token, options = {}) => {
    Cookies.set(COOKIE_NAME, token, options);
};

export const getCookie = () => {
    return Cookies.get(COOKIE_NAME);
};

export const removeCookie = () => {
    Cookies.remove(COOKIE_NAME);
};

// localStorage.js

const LOCAL_STORAGE_KEY = 'auth_token';

export const setLocalStorage = (token) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
};

export const getLocalStorage = () => {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
};

export const removeLocalStorage = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
};
