/* const sensorModel = require("../models/sensors.models");

async function processSensorData(data) {
  await sensorModel.insertSensorData(data.sensorId, data.value);
}

module.exports = { processSensorData }; */

const sensorModel = require("../models/sensors.models");

async function createSensor(data) {
  return sensorModel.insertSensor(data);
}

async function getAllSensors() {
  return sensorModel.getAllSensors();
}

async function getSensorById(id) {
  const result = await sensorModel.getSensorById(id);
  return result;
}

async function modifySensor(id, data) {
  return sensorModel.updateSensor(id, data);
}

async function removeSensor(id) {
  return sensorModel.deleteSensor(id);
}

module.exports = {
  createSensor,
  getAllSensors,
  getSensorById,
  modifySensor,
  removeSensor,
};
