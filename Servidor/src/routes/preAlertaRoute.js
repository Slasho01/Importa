const { Router } = require("express");
const {
    getPreAlertaByUserHandler,
    getPreAlertaDetailsHandler,
    createPreAlertaHandler,
    updatePreAlertaHandler
} = require('../handlers/preAlertaHandler')
const preAlertaRoute = Router();

preAlertaRoute.post("/", getPreAlertaByUserHandler);
preAlertaRoute.get("/:id", getPreAlertaDetailsHandler);
preAlertaRoute.post("/post", createPreAlertaHandler);
preAlertaRoute.put("/:id", updatePreAlertaHandler);
module.exports = preAlertaRoute;