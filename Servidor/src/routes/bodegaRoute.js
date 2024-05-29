const { Router } = require("express");
const {
    createBodegaHandler,
    updateBodegaHandler,
    getBodegaHandler,
    deleteBodegaHandler
} = require('../handlers/bodegaHandler')
const bodegaRouter = Router();

bodegaRouter.get("/", getBodegaHandler);
bodegaRouter.post("/", createBodegaHandler);
bodegaRouter.put("/:id", updateBodegaHandler);
bodegaRouter.delete("/:id", deleteBodegaHandler);
module.exports = bodegaRouter;