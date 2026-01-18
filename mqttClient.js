const mqtt = require('mqtt');
const pool = require('./db');

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('mine/sensors')
});

client.on('message', async(topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        await pool.query(
            'INSERT INTO sensor_data(sensor_id, value) VALUES ($1, $2)',
            [data.sensor_id, data.value]

        )
    console.log('Saved sensor data:', data);

    } catch (error) {
        console.log('Error processing the message', error)
    }

})