const { Router } = require("express");
const {
    createFacturcionDataHandler,
    updateFacturacionDataHandler,
    getFacturacionDataHandler
} = require('../handlers/facturacionHandler')
const facturacionRoute = Router();

facturacionRoute.get("/:id", getFacturacionDataHandler);
facturacionRoute.post("/", createFacturcionDataHandler);
facturacionRoute.put("/:id", updateFacturacionDataHandler);

module.exports = facturacionRoute;