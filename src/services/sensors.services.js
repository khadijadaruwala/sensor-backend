const sensorModel = require("../models/sensors.models");

async function processSensorData(data) {
  await sensorModel.insertSensorData(data.sensorId, data.value);
}

module.exports = { processSensorData };
