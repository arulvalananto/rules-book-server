const express = require("express");

const {
  addRules,
  deleteRules,
  updateRules,
} = require("../controllers/rules.controller");

const route = express.Router();

route.post("/add", addRules);
route.patch("/update/:id", updateRules);
route.patch("/delete/:id", deleteRules);

module.exports = route;
