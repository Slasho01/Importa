const {
  getPreAlertaByUserController,
  getPreAlertaDetailsController,
  createPreAlertaController,
  updatePreAlertaController,
} = require("../controllers/preAlertaController");

const getPreAlertaByUserHandler = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }
  try {
    const response = await getPreAlertaByUserController(userId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPreAlertaDetailsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getPreAlertaDetailsController(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createPreAlertaHandler = async (req, res) => {
  const data = req.body;
  try {
    await createPreAlertaController(data);
    res.status(200).json({message:"Pre-alerta creada con exito"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const updatePreAlertaHandler = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        await updatePreAlertaController(id, data);
        res.status(200).json({message:"Pre-alerta actualizada satisfactoriamente"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
module.exports = {
  getPreAlertaByUserHandler,
  getPreAlertaDetailsHandler,
  createPreAlertaHandler,
  updatePreAlertaHandler
};
