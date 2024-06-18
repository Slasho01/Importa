const { PreAlerta } = require("../DataBase");

const getPreAlertaByUserController = async(userId) => {
    try {
        const PreAlertas = await PreAlerta.findAll(
            {
                where: {
                    userId: `${userId}`
                }
            });
        return PreAlertas;
    } catch (error) {
        throw new Error(`Error al obtener las pre-alertas para el usuario con ID ${userId} debido a: ${error.message}`);
    }
};

module.exports = {
    getPreAlertaByUserController,
    
}