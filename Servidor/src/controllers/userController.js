const bcrypt = require('bcryptjs'); // Importar la biblioteca bcrypt.js
const { Users } = require('../DataBase');

const createUserController = async (username, password, email, roleId) => {
    try {
        // Generar un hash para la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10); // El segundo argumento es el número de rondas de encriptación

        // Buscamos en la entidad si el usuario ya está creado
        const [existingUser, created] = await Users.findOrCreate({
            where: { username },
            defaults: { username, password: hashedPassword, email, roleId }, // Usamos el hash de la contraseña
        });

        // Verificamos si el usuario ya existía
        if (!created) {
            throw new Error("Este usuario ya existe.");
        }

        return existingUser;
    } catch (error) {
        throw new Error(`Error al crear el usuario: ${error.message}`);
    }
}

module.exports = {
    createUserController,
}
