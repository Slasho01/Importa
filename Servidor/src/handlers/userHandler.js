const { createUserController } = require('../controllers/userController')

const createUserHandler = async (req, res) => {
    const { username, password, email } = req.body
    const roldefault = 1
    try {
      if (!username || typeof username !== "string" || username.trim() === "") {
        return res.status(400).json({
          error: "Solicitud incorrecta",
          message: "El nombre es obligatorio y debe ser una cadena no vacía.",
        });
      }
      await createUserController(username, password, email, roldefault);
      return res.status(201).json({ message: "Creado" });
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  };

  module.exports = {
    createUserHandler
  }