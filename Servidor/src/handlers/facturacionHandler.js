const {        createFacturacionDataController,
    updateFacturacionDataController,
    getFacturacionDataController } = require('../controllers/facturacionController');


const createFacturcionDataHandler = async (req, res) =>{
    const data = req.body;
    try {
        const response = await createFacturacionDataController(data);
    } catch (error) {
        
    }
}