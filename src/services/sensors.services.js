const model = require("../models/sensors.models");
const { sensorReadingSchema } = require("../utils/sensors.validator");

/**
 * Validates payload then stores it.
 * Missing/invalid fields -> throws error with status 400.
 */

async function createSensor(payload) {
  console.log(`----------Service file payload:${payload}`);

  const parsed = sensorReadingSchema.safeParse(payload);

  if (!parsed.success) {
    throw new AppError("Invalid sensor payload", 400);
  }

  return model.createSensor(parsed.data);
}

async function getAllSensors() {
  return sensorModel.getAllSensors();
}

async function getSensorById(id) {
  const result = await sensorModel.getSensorById(id);
  if (result.rows.length === 0) {
    throw new AppError("Sensor not found", 404);
  }
  return result;
}

async function modifySensor(id, payload) {
  const parsed = sensorReadingSchema.safeParse(payload);

  if (!parsed.success) {
    throw new AppError("Invalid sensor payload", 400);
  }
  return model.update(id, parsed.data);
}

async function removeSensor(id) {
  const result = sensorModel.deleteSensor(id);
  if (result.affected === 0) {
    throw new AppError("User not found", 404);
  }
}

module.exports = {
  createSensor,
  getAllSensors,
  getSensorById,
  modifySensor,
  removeSensor,
};
