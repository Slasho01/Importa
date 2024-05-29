const { Empresa } = require('../DataBase');

const createEmpresaController = async (data) => {
    try {
        console.log("Controller ", data)
        const existEmpresa = await Empresa.findOne();
        if (!existEmpresa) {
            const newEmpresa = await Empresa.create(data);
            return newEmpresa;
        } else {
            throw new Error(`ya existe una empresa registrada con el nombre ${existEmpresa.name}`); // Proporciona el nombre de la empresa existente en el mensaje de error
        }
    } catch (error) {
        throw new Error(`Error al añadir la información de la empresa, ${error.message}`);
    }
};

const updateEmpresaController = async (id, data) => {

    const {name, address, phone, status, rut, logo} = data
    try {
        const [updatedRowCount, updateEmpresa] = await Empresa.update({ name:name, address:address, phone:phone, status:status, rut:rut, logo:logo }, {
            where: {
                id: `${id}`
            }
        })
        if (updatedRowCount === 0) {
            throw new Error("No existe empresa registrada");
        }
        return updateEmpresa
    } catch (error) {
        throw new Error(`Error al actualizar la información de la empresa, ${error.message}`);
    }
}

module.exports = {
    createEmpresaController,
    updateEmpresaController
}