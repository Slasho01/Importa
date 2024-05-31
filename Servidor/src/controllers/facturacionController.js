const { FacturacionData } = require("../DataBase");

const createFacturacionDataController = async (data) => {
  try {
    const existFacturaData = await FacturacionData.findOne({
      where: { userId: data.userId },
    });
    if (existFacturaData) {
      throw new Error("Ya hay informacion registrada");
    } else {
      return await FacturacionData.crete(data);
    }
  } catch (error) {
    throw new Error(
      `Error al añadir la información de facturacion, ${error.message}`
    );
  }
};

const updateFacturacionDataController = async (id, data) => {
  const {} = data;
  try {
    const existFacturacionData = FacturacionData.findOne({
      where: { userId: userId },
    });
    if (existFacturacionData) {
      await FacturacionData.update({}, { where: { id } });
      return "Informacion de facturacion actualizzada";
    } else {
      throw new Error(
        `No se encontro informacion de facturacion registrada ${error.message}`
      );
    }
  } catch (error) {}
};

const getFacturacionDataController = async (id) => {
  try {
    const getFacturacionData = FacturacionData.findByPk(id);
    return getFacturacionData;
  } catch (error) {
    throw new Error(
      `Error al obtener la informacion de facturacion ${error.message}`
    );
  }
};

module.exports = {
    createFacturacionDataController,
  updateFacturacionDataController,
  getFacturacionDataController,
};
