require('dotenv').config();
const mysql = require('mysql2/promise');

// 1. Create the database connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 20000,
});

// 2. Test the connection immediately (Optional)
(async () => {
  try {
    const [rows] = await db.query('SELECT 1 AS ok');
    console.log('Connected successfully:', rows);
  } catch (e) {
    console.error('Database connection failed:', e.code, e.message);
  }
})();

// 3. Export the pool for use in other files
module.exports = db;
