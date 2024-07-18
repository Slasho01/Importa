import { jwtDecode } from "jwt-decode";
import { getCookie } from "./lsc"
// Función para obtener el ID del usuario desde un token JWT
export const getUserIdFromToken = async () => {
    const token = getCookie('token'); // Obtén el token JWT de localStorage
    if (token) {
        try {
            // Importar jwt-decode de forma dinámica
            //const jwtDecode = (await import('jwt-decode')).default;
            // Decodificar el token JWT
            const decodedToken = jwtDecode(token);
            // Extraer y devolver el ID del usuario
            return decodedToken.userId; // Ajusta la propiedad según cómo esté estructurado tu token
        } catch (error) {
            console.error('Error al decodificar el token JWT:', error);
            return null;
        }
    } else {
        console.error('No se encontró el token JWT');
        return null;
    }
};

/*export const checkTokenExpiration = () => {
    const token = localStorage.getItem('token'); // Obtén el token JWT de localStorage
    if (token) {
        try {
            // Decodificar el token JWT
            const decodedToken = jwtDecode(token);
            // Obtener la fecha de expiración del token en segundos
            const expirationTime = decodedToken.exp; // Tiempo de expiración en segundos desde UNIX epoch
            // Obtener la fecha actual en segundos
            const currentTime = Date.now() / 1000; // Convertir milisegundos a segundos

            // Si el tiempo actual es mayor que el tiempo de expiración del token, significa que el token ha expirado
            if (currentTime > expirationTime) {
                console.log('El token JWT ha expirado. Recargando la página...');
                // Recargar la página para forzar al usuario a iniciar sesión nuevamente
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al decodificar el token JWT:', error);
        }
    } else {
        console.error('No se encontró el token JWT');
    }
};*/
export default getUserIdFromToken;
