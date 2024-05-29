const { Router } = require("express");
const {
    createEmpresaHandler, updateEmpresaHandler
} = require('../handlers/empresaHandler')
const empresaRouter = Router();

empresaRouter.post("/", createEmpresaHandler);
empresaRouter.put("/:id", updateEmpresaHandler);

module.exports = empresaRouter;