const { Router } = require("express");
const {
    createuserInfoHandler,
    updateUserInfohandler
} = require('../handlers/userInfoHandler')
const userInfoRouter = Router();

userInfoRouter.post("/", createuserInfoHandler);
userInfoRouter.put("/:id", updateUserInfohandler);

module.exports = userInfoRouter;