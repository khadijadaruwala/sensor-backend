const mqtt = require("mqtt");
const service = require("../services/sensors.services");

// Subscribes to MQTT topic and stores incoming sensor readings to PostgreSQL.

function startMqttSubscriber() {
  const client = mqtt.connect(process.env.MQTT_BROKER, {
    clientId: process.env.MQTT_CLIENT_ID || `sensor-sub-${Date.now()}`,
    reconnectPeriod: 1000, // auto reconnect every 1s if disconnected
  });

  client.on("connect", () => {
    console.log("✅ Connected to MQTT broker");

    client.subscribe(process.env.MQTT_TOPIC, { qos: 1 }, (err) => {
      if (err) console.error("❌ MQTT subscribe error:", err.message);
      else console.log(`📡 Subscribed to ${process.env.MQTT_TOPIC}`);
    });
  });

  client.on("message", async (topic, message) => {
    try {
      const payload = JSON.parse(message.toString());
      await service.createSensor(payload);
      console.log(
        "✅ Stored MQTT reading:",
        payload.deviceId,
        payload.timestamp,
      );
    } catch (err) {
      console.error("❌ MQTT message failed:", err.message);
    }
  });

  client.on("error", (err) => console.error("❌ MQTT error:", err.message));

  return client;
}

module.exports = { startMqttSubscriber };

/* Command to publish the mqtt from the terminal to the broker:
mosquitto_pub -h broker.emqx.io \
  -t TEST_CLIMATE_SENSOR_DATA \
  -m '{"deviceId":"DEV-002","timestamp":"2026-01-26T10:15:30Z","humidity":53.2,"temperature":21.4,"pressure":110}'*/
