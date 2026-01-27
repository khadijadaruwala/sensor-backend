const db = require("../config/db");

/* CREATE */
async function createSensor(reading) {
  console.log(`-----------Model reading: ${reading}`);

  const query = `
    INSERT INTO sensor_readings (device_id, humidity, temperature, pressure, recorded_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    reading.deviceId,
    reading.humidity,
    reading.temperature,
    reading.pressure,
    reading.timestamp,
  ];

  return db.query(query, values);
}

/* UPDATE */
async function updateSensor(id, reading) {
  const query = `
    UPDATE sensor_readings
    SET humidity = $1, temperature = $2, pressure = $3, recorded_at = $4 WHERE id = $5
    RETURNING *;
  `;

  return db.query(query, [
    reading.humidity,
    reading.temperature,
    reading.pressure,
    reading.timestamp,
    id,
  ]);
}

/* READ ALL */
async function getAllSensors() {
  try {
    let query = `SELECT * FROM sensor_readings`;
    const values = [];

    if (deviceId) {
      values.push(deviceId);
      query += ` WHERE device_id = $1`;
    }

    values.push(limit);
    query += ` ORDER BY recorded_at DESC LIMIT $${values.length}`;

    const result = await db.query(query, values);
    return result;
  } catch (error) {
    throw error;
  }
}

/* READ ONE */
async function getSensorById(id) {
  try {
    return await db.query(`SELECT * FROM sensor_readings WHERE id = $1`, [id]);
  } catch (error) {
    throw error;
  }
}

/* DELETE */
async function deleteSensor(id) {
  return db.query(`DELETE FROM sensor_readings WHERE id = $1 RETURNING *`, [
    id,
  ]);
}

module.exports = {
  createSensor,
  updateSensor,
  getAllSensors,
  getSensorById,
  deleteSensor,
};
