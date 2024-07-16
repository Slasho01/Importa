const { Router } = require("express");
const {
    createFacturcionDataHandler,
    updateFacturacionDataHandler,
    getFacturacionDataHandler
} = require('../handlers/facturacionHandler')
const facturacionRoute = Router();
const { requireAuthID } = require('../utils/auth')

facturacionRoute.post("/:id", requireAuthID, getFacturacionDataHandler);
facturacionRoute.post("/", requireAuthID, createFacturcionDataHandler);
facturacionRoute.put("/:id", requireAuthID, updateFacturacionDataHandler);

module.exports = facturacionRoute;