const { PreAlerta } = require("../DataBase");

const getPreAlertaByUserController = async (userId) => {
  try {
    const PreAlertas = await PreAlerta.findAll({
      where: {
        userId: `${userId}`,
      },
    });
    return PreAlertas;
  } catch (error) {
    throw new Error(
      `Error al obtener las pre-alertas para el usuario con ID ${userId} debido a: ${error.message}`
    );
  }
};

const getPreAlertaDetailsController = async (id) => {
  try {
    if (!id) throw new Error("El ID proporcionado no es válido.");
    const preAlertaDetails = await PreAlerta.findByPk(id);
    if (!preAlertaDetails)
      throw new Error(`No se encontró ninguna Pre-Alerta con el ID ${id}.`);
    return preAlertaDetails;
  } catch (error) {
    throw new Error(
      `Error al obtener el detalle de la Pre-Alerta ${id} debido a: ${error.message}`
    );
  }
};

const createPreAlertaController = async (data) => {
  try {
    console.log("Hola")
    const createPrealerta = await PreAlerta.create(data);
    return "Se creo exitosamente la Pre-Alerta";
  } catch (error) {
    throw new Error(`Error al crear la PreAlerta: ${error.message}`);
  }
};

const updatePreAlertaController = async (id, data) => {
  const { date, origen, destino, peso, volumen, status } = data;
  console.log(date, origen, destino, peso, volumen, status)
  try {
    const updatePrealerta = await PreAlerta.update(
      {
        date: date,
        origen: origen,
        destino: destino,
        peso: peso,
        volumen: volumen,
        status: status,
      },
      {
        where: {
          id,
        }
      }
    );
    return "Pre-Alerta Actualizada";
  } catch (error) {
    throw new Error(`Error al actualizar la informacion; ${error.message}`);
  }
};

module.exports = {
  getPreAlertaByUserController,
  getPreAlertaDetailsController,
  createPreAlertaController,
  updatePreAlertaController,
};
