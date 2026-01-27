const express = require("express");
const app = express();
const { logger } = require("./middleware/logger.middleware");
const { errorHandler } = require("./middleware/error.middleware");
const routes = require("./routes/sensors.routes");

// parse JSON bodies
app.use(express.json());
app.use(logger);

// mount routes
app.use("/sensors", routes);

app.get("/", (req, res) => {
  res.send("✅ Homepage - Sensor Monitoring Service running");
});

// fallback for unknown routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// ERROR HANDLER (ALWAYS LAST)
app.use(errorHandler);

module.exports = app;
