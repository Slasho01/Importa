// En tu archivo de utilidades para cookies (cookieUtils.js)

import CryptoJS from 'crypto-js';
const key = import.meta.env.VITE_KEY
// Función para cifrar datos
export const encryptData = (data, key) => {
    return CryptoJS.AES.encrypt(data, key).toString();
};

// Función para descifrar datos
export const decryptData = (encryptedData, key) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};

// Función para establecer cookie cifrada
export const setCookie = (name, value, days = 7) => {
    const secretKey = key; // Reemplaza con una clave segura
    const encryptedValue = encryptData(value, secretKey);

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();

    document.cookie = `${name}=${encryptedValue}; ${expires}; path=/`;
};

// Función para obtener y descifrar cookie
export const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            const encryptedValue = c.substring(nameEQ.length, c.length);
            const secretKey = key; // Reemplaza con la misma clave segura
            return decryptData(encryptedValue, secretKey);
        }
    }
    return null;
};
export const getTokenFromCookie = (cookieName) => {
    // Nombre de la cookie donde se almacena el token
    const name = cookieName || 'token'; // Ajusta el nombre si es diferente
  
    // Obtener el valor cifrado de la cookie
    const encryptedValue = getCookie(name);
  
    if (encryptedValue) {
      // Clave secreta utilizada para cifrar la cookie
      const secretKey = 'clave-secreta-para-cifrado'; // Asegúrate de tener la clave correcta aquí
  
      // Descifrar el valor de la cookie
      const token = decryptData(encryptedValue, secretKey);
      
      return token;
    }
  
    return null;
};
  
// Función para eliminar cookie
export const removeCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999;`;
};
