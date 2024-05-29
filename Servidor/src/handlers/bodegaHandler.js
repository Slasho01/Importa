const { createBodegaController } = require('../controllers/bodegaController')

const createBodegaHandler = async (req, res) => {
    const data = req.body
    try {
        const response = await createBodegaController(data)
        console.log(response)
        return res.status(201).json(response)
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

module.exports = { 
    createBodegaHandler 
}