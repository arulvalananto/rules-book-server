const express = require("express");

const {
  login,
  register,
  getCurrentUser,
} = require("../controllers/auth.controller");

const isAuthenticated = require("../middlewares/isAuthenticated");

const route = express.Router();

route.post("/sign-in", login);
route.post("/sign-up", register);
route.get("/current-user", isAuthenticated, getCurrentUser);

module.exports = route;
