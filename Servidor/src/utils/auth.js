const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_KEY } = process.env;

const requireAuthA = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, JWT_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: "Token inválido" });
      } else {
        // Decodifica el token y lo agrega al objeto de solicitud
        req.user = decodedToken;
        // Verificar el rol del usuario
        const userRole = req.user.role;

        // Si el usuario tiene el rol adecuado, continuar con la siguiente función de middleware
        if (userRole === "Operador") {
          next();
        } else {
          res
            .status(403)
            .json({ error: "No tienes permiso para acceder a esta ruta" });
        }
      }
    });
  } else {
    res.status(401).json({ error: "Token de sesión no proporcionado" });
  }
};

const requireAuthM = (req, res, next) => {
  // Verificar si existe la cabecera de autorización y tiene el formato esperado
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Token de sesión no proporcionado" });
  }

  // Extraer el token de la cabecera
  const token = req.headers.authorization.split(" ")[1];

  // Verificar el token usando JWT
  jwt.verify(token, JWT_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // Decodificar el token y agregarlo al objeto de solicitud
    req.user = decodedToken;

    // Verificar el rol del usuario
    const userRole = req.user.role;

    // Si el usuario tiene el rol adecuado, continuar con el siguiente middleware
    if (userRole === "Cliente" || userRole === "Operador") {
      next();
    } else {
      res.status(403).json({ error: "No tienes permiso para acceder a esta ruta" });
    }
  });
};

const requireAuthID = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, JWT_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: "Token inválido" });
      } else {
        req.user = decodedToken;
        const userId = req.user.userId;
        const requestedUserId = req.body.userId;

        if (userId === requestedUserId) {
          next();
        } else {
          res.status(403).json({ error: "No tienes permiso para acceder a esta ruta" });
        }
      }
    });
  } else {
    res.status(401).json({ error: "Token de sesión no proporcionado" });
  }
};
module.exports = { requireAuthA, requireAuthM, requireAuthID };
