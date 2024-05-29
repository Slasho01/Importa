const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users, Rol } = require('../DataBase'); // Suponiendo que también tienes un modelo para los roles
require('dotenv').config();

const {
    JWT_KEY,
} = process.env;

const login = async (username, password) => {
    try {
        // Buscar al usuario por su nombre de usuario en la base de datos
        const user = await Users.findOne({ where: { username }, include: Rol });

        // Verificar si el usuario existe
        if (!user) {
            throw new Error("El usuario no existe.");
        }

        // Verificar si la contraseña es correcta
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Contraseña incorrecta.");
        }
        // Obtener el nombre del rol del usuario
        const roleName = user.Rol.rol; // Suponiendo que el modelo de Roles tiene un campo 'name' que contiene el nombre del rol
        // Generar un token de autenticación que incluya el id y el nombre del rol del usuario
        const token = jwt.sign({ userId: user.id, role: roleName }, JWT_KEY, { expiresIn: '1h' }); // Cambia 'secreto' por tu propia clave secreta

        return { token }; // Devolver el usuario y el token de autenticación
    } catch (error) {
        throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
}

module.exports = {
    login,
}
