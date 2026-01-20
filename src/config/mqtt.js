const mqtt = require("mqtt"); // require mqtt
const client = mqtt.connect("mqtt://test.mosquitto.org"); // create a client
const sensorService = require("../services/sensors.services");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("mine/sensors");
});

client.on("message", async (topic, message) => {
  const data = JSON.parse(message.toString());
  await sensorService.processSensorData(data);
});

module.exports = client;
