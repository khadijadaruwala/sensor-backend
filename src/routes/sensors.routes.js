const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensors.controllers");

router.post("/", controller.createSensor);
router.get("/", controller.getAllSensors);
router.get("/:id", controller.getSensorById);
router.put("/:id", controller.updateSensor);
router.delete("/:id", controller.deleteSensor);

module.exports = router;
