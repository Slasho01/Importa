const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_KEY } = process.env;

const requireAuthA = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (token) {
        jwt.verify(token, JWT_KEY, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ error: 'Token inválido' });
            } else {
                // Decodifica el token y lo agrega al objeto de solicitud
                req.user = decodedToken;
                // Verificar el rol del usuario
                const userRole = req.user.role;

                // Si el usuario tiene el rol adecuado, continuar con la siguiente función de middleware
                if (userRole === 'Operador') {
                    next();
                } else {
                    res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
                }
            }
        });
    } else {
        res.status(401).json({ error: 'Token de sesión no proporcionado' });
    }
};

const requireAuthM = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
        jwt.verify(token, JWT_KEY, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ error: 'Token inválido' });
            } else {
                // Decodifica el token y lo agrega al objeto de solicitud
                req.user = decodedToken;

                // Verificar el rol del usuario
                const userRole = req.user.role;

                // Si el usuario tiene el rol adecuado, continuar con la siguiente función de middleware
                if (userRole === 'Cliente') {
                    next();
                } else {
                    res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
                }
            }
        });
    } else {
        res.status(401).json({ error: 'Token de sesión no proporcionado' });
    }
};
module.exports = { requireAuthA, requireAuthM };