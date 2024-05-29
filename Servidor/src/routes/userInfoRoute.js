const { Router } = require("express");
const {
    createuserInfoHandler,
    updateUserInfohandler,
    getUserInfoByIdHandler
} = require('../handlers/userInfoHandler')
const userInfoRouter = Router();
const { requireAuthID } = require('../utils/auth')

userInfoRouter.post("/",requireAuthID, createuserInfoHandler);
userInfoRouter.put("/:id",requireAuthID, updateUserInfohandler);
userInfoRouter.get("/:id",requireAuthID, getUserInfoByIdHandler);

module.exports = userInfoRouter;