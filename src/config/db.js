const { Pool } = require("pg");

/**
 * Connection pool reuses DB connections.
 * This is faster and safer than opening a new connection every query.
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => console.log("✅ DB connected"));

pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("DB connection failed", err);
  else console.log("DB connected, time:", res.rows[0]);
});

module.exports = pool;
