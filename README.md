# Sensor Data Backend (Node.js + PostgreSQL + MQTT)

An **end-to-end real-world backend system** that simulates how IoT sensor data (like air-quality sensors) is ingested via **MQTT**, processed using **Node.js**, stored in **PostgreSQL**, and exposed through a **REST API**.

## 🚀 What This Project Does

✔ Receives live sensor data via **MQTT**  
✔ Stores sensor readings in **PostgreSQL**  
✔ Exposes stored data through an **Express REST API**  
✔ Uses industry-standard backend architecture  
✔ Fully runnable locally

## 🏗️ Tech Stack

| Layer         | Technology          |
| ------------- | ------------------- |
| Runtime       | Node.js             |
| Web Framework | Express.js          |
| Database      | PostgreSQL          |
| Messaging     | MQTT (Mosquitto)    |
| Dev Tools     | nodemon, Git        |
| Architecture  | MVC + Service Layer |

## 📁 Project Structure

```txt
sensor-backend/
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # App entry point
│   ├── config/
│   │   ├── db.js            # PostgreSQL connection
│   │   └── mqtt.js          # MQTT subscriber setup
│   ├── routes/
│   │   └── sensors.routes.js
│   ├── controllers/
│   │   └── sensors.controller.js
│   ├── services/
│   │   └── sensors.service.js
│   └── models/
│       └── sensors.model.js
├── package.json
├── README.md
└── .gitignore
```

## 🛠️ Architecture Flow

```txt
MQTT Sensor
   ↓
MQTT Broker
   ↓
Node.js MQTT Client
   ↓
Service Layer
   ↓
PostgreSQL Database
   ↓
REST API (Express)

```

## 🗄️ PostgreSQL Setup

### 1️⃣ Open PostgreSQL terminal

```bash
psql postgres
```

### 2️⃣ Create database

```sql
CREATE DATABASE sensors_db;
\c sensors_db
```

### 3️⃣ Create table

```sql
CREATE TABLE sensors (
  id SERIAL PRIMARY KEY,
  sensor_id TEXT,
  value NUMERIC,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 📦 Install Dependencies

```bash
npm install
```

For development:

```bash
npm install --save-dev nodemon
```

## ▶️ Run the Server

```bash
node src/server.js
```

or with nodemon:

```bash
nodemon src/server.js
```

You should see:

```bash
Server running on port 3000
Connected to MQTT broker
```

## 🔌 Send Test Sensor Data (MQTT)

```bash
/opt/homebrew/opt/mosquitto/bin/mosquitto_pub \
-t mine/sensors \
-m '{"sensorId":"AQS-101","value":415}'
```

- Data is received
- Stored in PostgreSQL

## 🌐 API Endpoint

Get all sensor readings

```bash
GET http://localhost:3000/sensors
```

Example response:

```bash
[
  {
    "sensor_id": "AQS-101",
    "value": 415,
    "created_at": "2025-01-20T10:15:00.000Z"
  }
]
```

## 🧪 Verify Database Data

```bash
psql sensors_db
```

```bash
SELECT * FROM sensors;
```

## 🧩 Key Concepts Demonstrated

- Express middleware
- MVC + service separation
- MQTT publish/subscribe model
- PostgreSQL parameterized queries
- Async/await error handling
- Environment-based configuration
- Clean backend architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC
