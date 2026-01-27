const { startMqttSubscriber } = require("./config/mqtt");
const app = require("./app");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
});

// Start MQTT subscriber service
startMqttSubscriber();
