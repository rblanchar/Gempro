const oracledb = require('oracledb');
const config = require('../config');

async function query(sql, params) {
  let connection;
  try {

    connection = await oracledb.getConnection(config.db);

    const result = await connection.execute(sql, params, { autoCommit: true });
   
    return result;
   
  } catch (err) {
    console.error('Error ejecutando la consulta: ', err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error cerrando la conexión: ', err);
      }
    }
  }
}

module.exports = {
  query
}
