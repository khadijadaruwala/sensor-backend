const sensorModel = require("../models/sensors.model");

async function processSensorData(data) {
  await sensorModel.insertSensorData(data.sensorId, data.value);
}

module.exports = { processSensorData };
