const service = require("../services/sensors.services");

// POST /sensors  (ingest via API)
async function createSensor(req, res, next) {
  try {
    // req.body is the full sensor object
    const result = await service.createSensor(req.body);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

// GET /sensors?deviceId=DEV-001&limit=50
async function getAllSensors(req, res, next) {
  try {
    const result = await service.getAllSensors({
      deviceId: req.query.deviceId,
      limit: req.query.limit ? Number(req.query.limit) : 100,
    });
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

// GET /sensors/:id
async function getSensorById(req, res, next) {
  try {
    const result = await service.getSensorById(req.params.id);
    if (!result.rows[0]) return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

// PUT /sensors/:id
async function updateSensor(req, res, next) {
  try {
    const result = await service.modifySensor(req.params.id, req.body);
    if (!result.rows[0]) return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

// DELETE /sensors/:id
async function deleteSensor(req, res, next) {
  try {
    const result = await service.removeSensor(req.params.id);
    if (!result.rows[0]) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
    res.json({ message: "Deleted", deleted: result.rows[0] });
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
