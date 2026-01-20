const { Pool } = require("pg");
console.log("DB NAME FROM ENV:", process.env.DB_NAME);

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) console.error("DB connection failed", err);
  else console.log("DB connected, time:", res.rows[0]);
});

module.exports = pool;
