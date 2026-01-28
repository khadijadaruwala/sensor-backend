const model = require("../models/sensors.models");
const { sensorReadingSchema } = require("../utils/sensors.validator");

async function createSensor(payload) {
  const parsed = sensorReadingSchema.safeParse(payload);

  if (!parsed.success) {
    throw new AppError("Invalid sensor payload", 400);
  }

  return model.createSensor(parsed.data);
}

async function getAllSensors(query) {
  return model.getAllSensors(query);
}

async function getSensorById(id) {
  const result = await model.getSensorById(id);
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
  return model.updateSensor(id, parsed.data);
}

async function deleteSensor(id) {
  const result = model.deleteSensor(id);
  if (result.affected === 0) {
    throw new AppError("Sensor not found", 404);
  }
  return result;
}

module.exports = {
  createSensor,
  getAllSensors,
  getSensorById,
  modifySensor,
  deleteSensor,
};
