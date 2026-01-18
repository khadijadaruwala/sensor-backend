const express = require('express');
const pool = require('./db');
require('./mqttClient') //start MQTT listener

const app = express();
app.use(express.json());

app.get('/health', (req,res) => {
    res.json({status: 'OK'});
})

app.get('/sensor/:id', async (req,res) => {
    const sensorId = req.params.id
    const result = await pool.query(
        'SELECT * FROM sensor_data WHERE sensor_id = $1 ORDER_BY created_at DESC',
        [sensor_id]
    )

    res.json(result.rows);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
    
})