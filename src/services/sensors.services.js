const sensorModel = require("../models/sensors.models");

async function createSensor(data) {
  return sensorModel.insertSensor(data);
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

async function modifySensor(id, data) {
  return sensorModel.updateSensor(id, data);
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
