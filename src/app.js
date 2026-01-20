const express = require("express");
const app = express();

// parse JSON bodies
app.use(express.json());

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

module.exports = app;
