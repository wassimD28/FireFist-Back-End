// bodyDiagram.route.js
const express = require("express");
const {
  getAllBodyDiagrams,
  getOneBodyDiagram,
} = require("../controllers/bodyDiagram.controller");

const route = express();

// GET all bodyDiagrams
route.get("/", getAllBodyDiagrams);

// GET one bodyDiagram by view mode and view angle
route.get("/:viewMode/:viewAngle", getOneBodyDiagram);

module.exports = route;
