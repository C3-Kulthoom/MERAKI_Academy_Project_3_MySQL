const express = require("express");
const { createNewRole } = require("../controllers/roles");

// define router
const rolesRouter = express.Router();

// 			routes
//post  http://localhost:5000/roles/

rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;
