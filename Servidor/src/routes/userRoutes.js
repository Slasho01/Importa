const { Router } = require("express");
const {
    createUserHandler
} = require('../handlers/userHandler')
const usersRouter = Router();

usersRouter.post("/", createUserHandler);

module.exports = usersRouter;