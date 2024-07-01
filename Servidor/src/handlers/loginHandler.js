const { login } = require('../controllers/loginController'); // Importa la función de autenticación

const loginHandler = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token } = await login(username, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    loginHandler,
}