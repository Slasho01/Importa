const { Router } = require("express");
const {
    getRolHandler
} = require('../handlers/rolHandler')
const { requireAuthA, requireAuthM } = require('../utils/auth')
const roleRouter = Router();

roleRouter.get("/:id", requireAuthA, getRolHandler);

module.exports = roleRouter;