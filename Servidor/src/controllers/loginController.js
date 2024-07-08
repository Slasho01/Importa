const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users, Rol } = require('../DataBase');
require('dotenv').config();

const { JWT_KEY } = process.env;

const login = async (username, password) => {
    try {
        const user = await Users.findOne({ where: { username }, include: Rol });

        if (!user) {
            throw new Error("El usuario no existe.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Contraseña incorrecta.");
        }

        const roleName = user.Rol.rol;
        const token = jwt.sign({ userId: user.id, role: roleName }, JWT_KEY, { expiresIn: '1h' });

        return { token };
    } catch (error) {
        throw new Error(`Error al iniciar sesión: ${error.message}`);
    }
}

module.exports = {
    login,
}
