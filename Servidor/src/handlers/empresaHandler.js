const { createEmpresaController, updateEmpresaController } = require('../controllers/empresaController')

const createEmpresaHandler = async (req, res) => {
    const data = req.body
    try {
        const response = await createEmpresaController(data)
        return res.status(201).json(response)
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}
const updateEmpresaHandler = async (req, res) => {
    const {id} = req.params
    const data = req.body
    try {
        const resp = await updateEmpresaController(id, data);
        return res.status(200).json({ message: "Empresa actualizada", data: resp });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports = { createEmpresaHandler, updateEmpresaHandler }