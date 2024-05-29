const { Router } = require("express");
const {
    createBodegaHandler,
    updateBodegaHandler,
    getBodegaHandler
} = require('../handlers/bodegaHandler')
const bodegaRouter = Router();

bodegaRouter.get("/", getBodegaHandler);
bodegaRouter.post("/", createBodegaHandler);
bodegaRouter.put("/:id", updateBodegaHandler);

module.exports = bodegaRouter;