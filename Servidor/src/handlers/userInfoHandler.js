const {
  createUserInfoController,
  updateUserInfoController,
  getUserInfoByIdController
} = require("../controllers/userInfoController");

const createuserInfoHandler = async (req, res) => {
  const data = req.body;
  try {
    const response = await createUserInfoController(data);
    return res.status(200).json("Informacion registrada correctamente");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUserInfohandler = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await updateUserInfoController(id, data);
    return res.status(201).json("Informacion actualizada correctamente");
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

const getUserInfoByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getUserInfoByIdController(id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(401).json({message: error.message});
  }
};

module.exports = {
  createuserInfoHandler,
  updateUserInfohandler,
  getUserInfoByIdHandler
};
