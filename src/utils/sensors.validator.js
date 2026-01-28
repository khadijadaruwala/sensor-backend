const { z } = require("zod");

const sensorReadingSchema = z.object({
  deviceId: z.string().min(1, "deviceId is required"),
  timestamp: z.string().datetime("timestamp must be ISO datetime"),
  humidity: z.number(),
  temperature: z.number(),
  pressure: z.number(),
});

module.exports = { sensorReadingSchema };
