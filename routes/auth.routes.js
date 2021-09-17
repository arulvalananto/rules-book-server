const express = require("express");

const { login, register } = require("../controllers/auth.controller");

const route = express.Router();

route.post("/sign-in", login);
route.post("/sign-up", register);

module.exports = route;
