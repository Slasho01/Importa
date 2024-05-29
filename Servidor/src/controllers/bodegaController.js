const { Bodega } = require('../DataBase');

const getBodegaController = async () =>{
    try {
        const getBodega = await Bodega.findAll()
        return getBodega
    } catch (error) {
        throw new Error(`Error al obtener las bodegas ${error.message}`);
    }
}
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

const updateBodegaController = async (id, data) => {
    const {name, address, city, country, image_url} = data
    try {
        const updateBodega = Bodega.update({name: name, address: address, city: city, country: country, image_url: image_url}, {
            where:{
                id: `${id}` 
            }
        })
        console.log()
        return updateBodega
    } catch (error) {
        throw new Error(`Error al actualizar la información de la bodega, ${error.message}`);
    }
}

const deleteBodegaController = async (id) => {
    try {
        const deleteBodega = await Bodega.destroy({where: {id} });
        return deleteBodega
    } catch (error) {
        throw new Error(`Error al eliminar la información de la bodega, ${error.message}`);
    }
}
module.exports = {
    createBodegaController, 
    updateBodegaController,
    getBodegaController,
    deleteBodegaController
}