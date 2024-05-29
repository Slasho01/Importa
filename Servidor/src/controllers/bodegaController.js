const { Bodega } = require('../DataBase');

const createBodegaController = async (data) => {
    try {
        const existBodega = await Bodega.findAll();
        if (existBodega.length < 4) {
            const newEmpresa = await Bodega.create(data);
            return newEmpresa;
        } else {
            throw new Error(`capacidad de registro de bodegas fue superado Capacidad: ${existBodega.length} de 4`); // Proporciona el nombre de la empresa existente en el mensaje de error
        }
    } catch (error) {
        throw new Error(`Error al añadir una nueva bodega debido a que la ${error.message}`);
    }
};

module.exports = {
    createBodegaController
}