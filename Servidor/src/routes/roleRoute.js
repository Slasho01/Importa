const { Router } = require("express");
const {
    getRolHandler
} = require('../handlers/rolHandler')
const roleRouter = Router();

roleRouter.get("/:id", getRolHandler);

module.exports = roleRouter;