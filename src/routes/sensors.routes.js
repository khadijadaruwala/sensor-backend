console.log("I am in the route");

const express = require("express");
const router = express.Router();
const { getAllSensors } = require("../controllers/sensors.controllers");

//router.get("/", getAllSensors);
router.get("/", (req, res) => {
  console.log("Test route hit");
  res.json([{ sensor_id: "TEST", value: 123 }]);
});

module.exports = router;
