const { getRolController } = require('../controllers/rolController')

const getRolHandler = async(req, res) =>{
    const {id} = req.params;
    try {
        const rol = await getRolController(id);
        return res.status(200).json(rol)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

module.exports = {
    getRolHandler
}