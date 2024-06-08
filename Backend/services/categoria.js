const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM categoria_productos ORDER BY id_categoria OFFSET ${offset} ROWS FETCH NEXT ${config.listPerPage} ROWS ONLY`, []
  );
  const data = helper.emptyOrRows(rows.rows);
  //const meta = {page};

  return {
    data,
    //meta
  }
}

async function create(categoria) {
  const sql = `INSERT INTO categoria_productos (id_categoria, nombre) VALUES (seq_id_categoria_producto.NEXTVAL, :nombre)`;

  const binds = { nombre: categoria.nombre };
  const result = await db.query(sql, binds);

  let message = 'Error in creating the Category';

  if (result && result.rowsAffected  > 0) {
    message = 'Category created successfully';
  }

  return { message };
}

async function update(id_categoria, nombre) {
  const sql = `UPDATE categoria_productos SET id_categoria = NVL(:id_categoria, id_categoria),
  nombre = NVL(:nombre, nombre) WHERE id_categoria = :id_categoria`;

  const binds = { id_categoria: id_categoria, nombre: nombre };
  const result = await db.query(sql, binds);

  let message = 'Error in updating the Category';

  if (result &&  result.rowsAffected > 0) {
    message = 'Category updated successfully';
  }

  return { message };
}

async function remove(id_categoria) {
  const sql = `DELETE FROM categoria_productos WHERE id_categoria = :id_categoria`;

  const binds = { id_categoria: id_categoria };
  const result = await db.query(sql, binds);

  let message = 'Error in deleting the Category';

  if (result && result.rowsAffected && result.rowsAffected > 0) {
    message = 'Category deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create, 
  update,
  remove,
}