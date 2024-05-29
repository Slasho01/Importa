const { Router } = require("express");
const {
    createBodegaHandler,
} = require('../handlers/bodegaHandler')
const bodegaRouter = Router();

bodegaRouter.post("/", createBodegaHandler);
//bodegaRouter.put("/:id", updateBodegaHandler);

module.exports = bodegaRouter;