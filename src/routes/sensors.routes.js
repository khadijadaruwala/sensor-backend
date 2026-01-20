const express = require("express");
const router = express.Router();
const { getAllSensors } = require("../controllers/sensors.controllers");
router.get("/", getAllSensors);

module.exports = router;
