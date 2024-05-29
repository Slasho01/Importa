const { UserInfo } = require("../DataBase");
const createUserInfoController = async (data) => {
  try {
    // Verificar si ya existe UserInfo para el usuario
    const existingUserInfo = await UserInfo.findOne({
      where: { userId: data.userId },
    });

    if (existingUserInfo) {
      // Si UserInfo ya existe, actualizarlo
      return await updateUserInfoController(existingUserInfo.id, data);
    } else {
      // Si UserInfo no existe, crear uno nuevo
      return await UserInfo.create(data);
    }
  } catch (error) {
    throw new Error(
      `Error al añadir o actualizar la información del usuario, ${error.message}`
    );
  }
};

const updateUserInfoController = async (id, data) => {
  const { address, phone, rut, birth_date, userId } = data;
  try {
    // Verificar si UserInfo existe
    const userInfo = await UserInfo.findOne({ where: { userId: userId  } });
    if (userInfo) {
      // Si existe, actualizarlo
      await UserInfo.update(
        { address, phone, rut, birth_date },
        { where: { id } }
      );
      return "informacion actualizada correctamente"; // Otra indicación de que la actualización fue exitosa
    } else {
      // Si no existe, enviar a crear
      return await createUserInfoController(data);
    }
  } catch (error) {
    throw new Error(`Error al actualizar la información del usuario, ${error.message}`);
  }
};
module.exports = {
  createUserInfoController,
  updateUserInfoController,
};