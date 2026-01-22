const db = require("../config/db");

/* CREATE */
async function insertSensor(data) {
  const query = `
    INSERT INTO sensors (sensor_id, value)
    VALUES ($1, $2)
    RETURNING *
  `;
  return db.query(query, [data.sensorId, data.value]);
}

/* UPDATE */
async function updateSensor(id, data) {
  const query = `
    UPDATE sensors
    SET value = $1
    WHERE id = $2
    RETURNING *
  `;
  return await db.query(query, [data.value, id]);
}

/* READ ALL */
async function getAllSensors() {
  try {
    const result = await db.query(
      "SELECT * FROM sensors ORDER BY created_at DESC",
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
}

/* READ ONE */
async function getSensorById(id) {
  try {
    return await db.query("SELECT * FROM sensors WHERE id = $1;", [id]);
  } catch (error) {
    throw error;
  }
}

/* DELETE */
async function deleteSensor(id) {
  await db.query("DELETE FROM sensors WHERE id = $1", [id]);
}

module.exports = {
  insertSensor,
  updateSensor,
  getAllSensors,
  getSensorById,
  deleteSensor,
};
