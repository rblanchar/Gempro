const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM materiales ORDER BY id_material OFFSET ${offset} ROWS FETCH NEXT ${config.listPerPage} ROWS ONLY`, []
  );
  const data = helper.emptyOrRows(rows.rows);
 // const meta = {page};

  return {
    data,
  //  meta
  }
}


async function create(material) {
  const sql = `INSERT INTO materiales (id_material, nombre) VALUES (seq_id_material.NEXTVAL, :nombre)`;

  const binds = { nombre: material.nombre };
  const result = await db.query(sql, binds);

  let message = 'Error in creating the Material';

  if (result && result.rowsAffected  > 0) {
    message = 'Material created successfully';
  }

  return { message };
}

async function update(id_material, nombre) {
  const sql = `UPDATE materiales SET id_material = NVL(:id_material, id_material),
  nombre = NVL(:nombre, nombre) WHERE id_material = :id_material`;

  const binds = { id_material: id_material, nombre: nombre };
  const result = await db.query(sql, binds);

  let message = 'Error in updating the Material';

  if (result &&  result.rowsAffected > 0) {
    message = 'Material updated successfully';
  }

  return { message };
}

async function remove(id_material) {
  const sql = `DELETE FROM materiales WHERE id_material = :id_material`;

  const binds = { id_material: id_material };
  const result = await db.query(sql, binds);

  let message = 'Error in deleting the Material';

  if (result && result.rowsAffected && result.rowsAffected > 0) {
    message = 'Material deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create, 
  update,
  remove,
}