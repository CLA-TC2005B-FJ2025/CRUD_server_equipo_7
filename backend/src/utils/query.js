const { sql } = require('../config/db');

const customQuery = async (query) => {
  try {
    const pool = await sql.connect();
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    sql.close();
  }
};

module.exports = { customQuery };