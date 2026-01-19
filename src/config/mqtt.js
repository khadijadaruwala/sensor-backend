const pool = require("./db");
const mqtt = require("mqtt"); // require mqtt
const client = mqtt.connect("mqtt://test.mosquitto.org"); // create a client

client.on("connect", () => {
  console.log("On Connect");
  console.log("Connected to MQTT broker");
  client.subscribe("mine/sensors");
});

client.on("message", async (topic, message) => {
  try {
    console.log("On Message");
    const data = JSON.parse(message.toString());

    await pool.query(
      "INSERT INTO sensor_data(sensor_id, value) VALUES ($1, $2)",
      [data.sensorId, data.value],
    );

    console.log("Saved sensor data:", data);
  } catch (error) {
    console.error("Error processing message", error);
  }
});
