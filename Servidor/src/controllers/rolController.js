const { Rol } = require('../DataBase');

const getRolController = async (id) =>{
    try {
        //Asignamos a categories todas las categorias
        const rol = await Rol.findByPk(id);
        //verificamos que no este vacia
        if (!rol) {
            throw new Error("Rol no encontrado");
        }
        //retornamos las categorias de no entrar en el if anterior
    
        return { Rol: rol };
      } catch (error) {
        throw new Error(error.message);
      }
}
module.exports = {
    getRolController
}