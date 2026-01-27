const express = require("express");
const controller = require("../controllers/sensors.controllers");
const router = express.Router();

router.post("/", controller.createSensor);
router.get("/", controller.getAllSensors);
router.get("/:id", controller.getSensorById);
router.put("/:id", controller.updateSensor);
router.delete("/:id", controller.deleteSensor);

module.exports = router;
