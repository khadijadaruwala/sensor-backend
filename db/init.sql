CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS sensor_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  temperature NUMERIC(5,2) NOT NULL,
  humidity    NUMERIC(5,2) NOT NULL,
  pressure    NUMERIC(8,2) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL,
  ingested_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sensor_device_time
ON sensor_readings(device_id, recorded_at DESC);
