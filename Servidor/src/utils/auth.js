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
        if (userRole === "Cliente" || userRole === "Operador") {
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

const requireAuthID = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, JWT_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: "Token inválido" });
      } else {
        // Decodifica el token y lo agrega al objeto de solicitud
        req.user = decodedToken;

        // Obtener el ID de usuario del token decodificado
        const userId = req.user.userId;
        // Obtener el ID de usuario de la solicitud
        const requestedUserId = req.body.userId; // Assuming userId is in the body
        console.log(userId, " con ", requestedUserId)

        // Verificar si el ID de usuario de la solicitud coincide con el ID de usuario del token
        if (userId === requestedUserId) {
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
module.exports = { requireAuthA, requireAuthM, requireAuthID };
