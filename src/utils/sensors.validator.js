const { z } = require("zod");

const sensorReadingSchema = z.object({
  deviceId: z.string().min(1, "deviceId is required"),
  timestamp: z.string().datetime({
    message: "timestamp must be ISO datetime",
  }),

  humidity: z.number().min(0).max(100),
  temperature: z.number().min(-100).max(100),
  pressure: z.number().positive(),
});

module.exports = { sensorReadingSchema };
