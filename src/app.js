const express = require("express");
const app = express();
const { logger } = require("./middleware/logger.middleware");
const { errorHandler } = require("./middleware/error.middleware");

// parse JSON bodies
app.use(express.json());
app.use(logger);

// import routes
const sensorsRoutes = require("./routes/sensors.routes");

// mount routes
app.use("/sensors", sensorsRoutes);

app.get("/", (req, res) => {
  res.send("Homepage");
});

// fallback for unknown routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// ERROR HANDLER (ALWAYS LAST)
app.use(errorHandler);

module.exports = app;
