const db = require("../config/db");

async function insertSensorData(sensorId, value) {
  const query = `INSERT INTO sensors(sensor_id , value)
  VALUES($1, $2)
  `; // parameterized query (safe!)
  await db.query(query, [sensorId, value]);
}

module.exports = { insertSensorData };
