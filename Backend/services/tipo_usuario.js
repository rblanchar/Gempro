const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM tipo_usuarios ORDER BY id_tipo OFFSET ${offset} ROWS FETCH NEXT ${config.listPerPage} ROWS ONLY`, []
  );
  const data = helper.emptyOrRows(rows.rows);
 // const meta = {page};

  return {
    data,
  //  meta
  }
}


async function create(tipo_usuario) {
  const sql = `INSERT INTO tipo_usuarios (id_tipo, nombre) VALUES (seq_id_tipo_usuario.NEXTVAL, :nombre)`;

  const binds = { nombre: tipo_usuario.nombre };
  const result = await db.query(sql, binds);

  let message = 'Error in creating the Type of User';

  if (result && result.rowsAffected  > 0) {
    message = 'Type of User created successfully';
  }

  return { message };
}

async function update(id_tipo, nombre) {
  const sql = `UPDATE tipo_usuarios SET id_tipo = NVL(:id_tipo, id_tipo),
  nombre = NVL(:nombre, nombre) WHERE id_tipo = :id_tipo`;

  const binds = { id_tipo: id_tipo, nombre: nombre };
  const result = await db.query(sql, binds);

  let message = 'Error in updating Type of User';

  if (result &&  result.rowsAffected > 0) {
    message = 'Type of User updated successfully';
  }

  return { message };
}

async function remove(id_tipo) {
  const sql = `DELETE FROM tipo_usuarios WHERE id_tipo = :id_tipo`;

  const binds = { id_tipo: id_tipo };
  const result = await db.query(sql, binds);

  let message = 'Error in deleting Type of User';

  if (result && result.rowsAffected > 0) {
    message = 'Type of User deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create, 
  update,
  remove,
}