// const express = require("express");
// const app = express();

// app.use(express.json());

// const sensorsRoutes = require("./routes/sensors.routes");
// app.use("/sensors", sensorsRoutes);

// module.exports = app;

require("dotenv").config(); // load .env first
const express = require("express");
const app = express();

// parse JSON bodies
app.use(express.json());

// import routes
const sensorsRoutes = require("./routes/sensors.routes");

// mount routes
app.use("/sensors", sensorsRoutes);

// fallback for unknown routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

module.exports = app;
