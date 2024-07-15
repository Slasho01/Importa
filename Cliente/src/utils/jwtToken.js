import { jwtDecode } from "jwt-decode";
// Función para obtener el ID del usuario desde un token JWT
const getUserIdFromToken = async () => {
    const token = localStorage.getItem('token'); // Obtén el token JWT de localStorage
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

export default getUserIdFromToken;
