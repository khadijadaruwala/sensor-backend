const { z } = require("zod");

/**
 * Validates the incoming sensor payload.
 * - deviceId must exist
 * - timestamp must be ISO datetime string
 * - /humidity/temperature/pressure must be numbers
 */
const sensorReadingSchema = z.object({
  deviceId: z.string().min(1, "deviceId is required"),
  timestamp: z.string().datetime("timestamp must be ISO datetime"),
  humidity: z.number(),
  temperature: z.number(),
  pressure: z.number(),
});

module.exports = { sensorReadingSchema };
