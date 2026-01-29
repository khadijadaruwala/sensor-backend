const db = require("../config/db");

/* CREATE */
async function createSensor(reading) {
  const query = `
    INSERT INTO sensor_readings (device_id, humidity, temperature, pressure, recorded_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const recorded_at = new Date(reading.timestamp).toISOString();

  const values = [
    reading.deviceId,
    reading.humidity,
    reading.temperature,
    reading.pressure,
    recorded_at,
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
  const recorded_at = new Date(reading.timestamp).toISOString();

  return await db.query(query, [
    reading.humidity,
    reading.temperature,
    reading.pressure,
    recorded_at,
    id,
  ]);
}

/* READ ALL */
async function getAllSensors({ deviceId, limit = 100 }) {
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
  const result = await db.query(
    `DELETE FROM sensor_readings WHERE id = $1 RETURNING *`,
    [id],
  );
  return result;
}

module.exports = {
  createSensor,
  updateSensor,
  getAllSensors,
  getSensorById,
  deleteSensor,
};
