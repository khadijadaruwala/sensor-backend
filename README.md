# Sensor Data Backend (Node.js + PostgreSQL + MQTT)

An end-to-end IoT backend system that simulates how industrial sensor data is:

✔ Collected in real time via MQTT
✔ Processed using Node.js
✔ Stored in PostgreSQL
✔ Exposed through a REST API

## 🚀 What This Project Does

✔ Receives live sensor data via **MQTT**
✔ Validates incoming data using **Zod**
✔ Stores sensor readings in **PostgreSQL**  
✔ Exposes stored data through an **Express REST API** for **CRUD** operations
✔ Uses industry-standard backend architecture  
✔ Fully runnable locally

## 🏗️ Tech Stack

| Layer         | Technology             |
| ------------- | ---------------------- |
| Runtime       | Node.js                |
| Web Framework | Express.js             |
| Database      | PostgreSQL             |
| Messaging     | MQTT (EMQX broker)     |
| Validation    | Zod                    |
| Dev Tools     | nodemon, Git, DataGrip |
| Architecture  | MVC + Service Layer    |

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
│   │     └── sensors.model.js
│   ├── utils/
│   │   └── appError.js
│   │   └── sensors.validator.js
|
├── package.json
├── README.md
└── .gitignore
```

## 🛠️ Architecture Flow

```txt
IoT Device / Simulator
        ↓
MQTT Broker (broker.emqx.io)
Topic: TEST_CLIMATE_SENSOR_DATA
        ↓
Node.js MQTT Subscriber
        ↓
Service Layer (Validation + Logic)
        ↓
PostgreSQL Database
Table: sensor_readings
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
CREATE DATABASE sensor_monitoring_db;
\c sensors_db
```

### 3️⃣ Create table

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE sensor_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  temperature NUMERIC(5,2) NOT NULL,
  humidity NUMERIC(5,2) NOT NULL,
  pressure NUMERIC(8,2) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL,
  ingested_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sensor_device_id ON sensor_readings(device_id);
CREATE INDEX idx_sensor_device_time ON sensor_readings(device_id, recorded_at DESC);
CREATE INDEX idx_sensor_recorded_at ON sensor_readings(recorded_at DESC);
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
DB connected
Connected to MQTT broker
Server running on port 8000
```

## 🔌 Send Test Sensor Data (MQTT)

```bash
mosquitto_pub -h broker.emqx.io \
-t TEST_CLIMATE_SENSOR_DATA \
-m '{"deviceId":"DEV-001","timestamp":"2026-01-22T10:15:30Z","temperature":28.4,"humidity":61.2,"pressure":101}'

```

- Data is received
- Stored in PostgreSQL

## 🌐 API Endpoint

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| POST   | `/sensors`     | Insert reading |
| GET    | `/sensors`     | List readings  |
| GET    | `/sensors/:id` | Get one        |
| PUT    | `/sensors/:id` | Update         |
| DELETE | `/sensors/:id` | Delete         |

Example POST body:

```bash
{
  "deviceId": "DEV-001",
  "timestamp": "2026-01-22T10:15:30Z",
  "temperature": 28.4,
  "humidity": 61.2,
  "pressure": 101
}

```

## ✔ Validation

Uses Zod schema:

✔ Required fields
✔ ISO datetime validation
✔ Numeric sensor values

Invalid payload → 400 Bad Request

## ⏱ Timestamp Handling

We use:

```bash
TIMESTAMPTZ
```

Because:
✔ Handles timezones automatically
✔ Avoids ambiguity in distributed systems

## 🚨 Error Handling

Central error middleware ensures clean error responses and prevents server crashes.

## 📈 Database Index Strategy

| Index                   | Purpose                    |
| ----------------------- | -------------------------- |
| device_id               | Device lookup              |
| device_id + recorded_at | Latest readings per device |
| recorded_at             | Time-based queries         |

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
