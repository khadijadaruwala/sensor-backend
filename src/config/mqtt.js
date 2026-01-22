const mqtt = require("mqtt"); // require mqtt
const client = mqtt.connect(process.env.MQTT_BROKER); // create a client
const sensorService = require("../services/sensors.services");

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("mine/sensors");
});

client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    await sensorService.createSensor(data);
  } catch (error) {
    console.error("MQTT processing failed:", error.message);
  }
});

module.exports = client;

/* Command to publish the mqtt from the terminal to the broker:
mosquitto_pub -h test.mosquitto.org -t mine/sensors -m '{"sensorId":"AQS-103","value":500}' */
