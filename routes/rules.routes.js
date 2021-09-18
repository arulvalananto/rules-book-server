const express = require("express");

const {
  addRules,
  deleteRules,
  updateRules,
} = require("../controllers/rules.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const route = express.Router();

route.use(isAuthenticated);

route.post("/add", addRules);
route.patch("/update/:id", updateRules);
route.delete("/delete/:id", deleteRules);

module.exports = route;
