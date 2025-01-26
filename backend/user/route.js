const express = require("express");
const create = require("./create");
const login = require("./login");
const userRouter = express.Router();

userRouter.post("/create", create);

userRouter.post("/login", login);

module.exports = userRouter;
