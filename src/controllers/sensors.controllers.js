const sensorService = require("../services/sensors.services");

async function createSensor(req, res, next) {
  try {
    // req.body is the full sensor object
    const result = await sensorService.createSensor(req.body);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function getAllSensors(req, res, next) {
  try {
    const result = await sensorService.getAllSensors();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getSensorById(req, res, next) {
  try {
    const result = await sensorService.getSensorById(req.params.id);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function updateSensor(req, res, next) {
  try {
    const result = await sensorService.modifySensor(req.params.id, req.body);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function deleteSensor(req, res, next) {
  try {
    await sensorService.removeSensor(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createSensor,
  getAllSensors,
  getSensorById,
  updateSensor,
  deleteSensor,
};
