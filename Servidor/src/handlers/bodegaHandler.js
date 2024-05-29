const { createBodegaController, updateBodegaController, getBodegaController } = require('../controllers/bodegaController')

const getBodegaHandler = async (req, res) =>{
    try {
        const respons = await getBodegaController();
        return res.status(201).json(respons)
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}
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

const updateBodegaHandler = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const response = await updateBodegaController(id, data);
        return res.status(201).json("Bodega actualizada");
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

module.exports = { 
    createBodegaHandler,
    updateBodegaHandler,
    getBodegaHandler 
}