const {        createFacturacionDataController,
    updateFacturacionDataController, 
    getFacturacionDataController } = require('../controllers/facturacionController');

const getFacturacionDataHandler = async (req, res) =>{
    const { id } = req.params
    try {
        const response = await getFacturacionDataController(id);
        res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}
const createFacturcionDataHandler = async (req, res) =>{
    const data = req.body;
    try {
        await createFacturacionDataController(data);
        return res.status(201).json({message: "Informazcion Creada"});
    } catch (error) {
        return res.status(401).json({message: error.message});
    }
}

const updateFacturacionDataHandler = async(req, res) =>{
    const data = req.body;
    const {id} = req.params;
    try {
        await updateFacturacionDataController(id, data);
        return res.status(200).json({message: "Informazcion Actualizada"});
    } catch (error) {
        return res.status(401).json({message: error.message});
    }
}

module.exports = {
    createFacturcionDataHandler,
    updateFacturacionDataHandler,
    getFacturacionDataHandler
}