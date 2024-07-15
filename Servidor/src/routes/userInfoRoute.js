const { Router } = require("express");
const {
    createuserInfoHandler,
    updateUserInfohandler,
    getUserInfoByIdHandler
} = require('../handlers/userInfoHandler')
const userInfoRouter = Router();
const { requireAuthID } = require('../utils/auth')

userInfoRouter.post("/", requireAuthID, createuserInfoHandler);
userInfoRouter.put("/:id", requireAuthID, updateUserInfohandler);
userInfoRouter.post("/:id", requireAuthID, getUserInfoByIdHandler);

module.exports = userInfoRouter;