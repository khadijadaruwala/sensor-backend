const db = require("../config/db");
async function getAllSensors(req, res) {
  console.log("I am in the controller");

  try {
    const result = await db.query(
      "SELECT * FROM sensors ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sensors" });
  }
}

module.exports = { getAllSensors };
