const express = require("express");
const { login } = require("../controllers/authentication");

// define router
const authenticationRouter = express.Router();

// 			routes
//post  http://localhost:5000/login/
authenticationRouter.post("/login", login);

module.exports = authenticationRouter;
