// providing a promise-based API for MySQL operations.

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.Hostname,
  user: process.env.Username,
  password: process.env.Password,
  database: process.env.Database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
