const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,     // localhost
  port: parseInt(process.env.DB_PORT), // 1433
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,
    encrypt: false
    // ❌ NO pongas instanceName
  }
};

const poolPromise = sql.connect(config)
  .then(pool => {
    console.log('✅ Conectado a SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ Error al conectar:', err);
  });

module.exports = {
  sql,
  poolPromise
};