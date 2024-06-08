const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM productos ORDER BY id_producto OFFSET ${offset} ROWS FETCH NEXT ${config.listPerPage} ROWS ONLY`, []
  );
  const data = helper.emptyOrRows(rows.rows);
  //const meta = {page};

  return {
    data,
    //meta
  }
}


async function create(producto) {
  const sql = `
    INSERT INTO productos (id_producto, descripcion, costo, peso, margen_ganancia, cantidad, id_categoria, id_material) 
    VALUES (seq_id_producto.NEXTVAL, :descripcion, :costo, :peso, :margen_ganancia, :cantidad, :id_categoria, :id_material)
  `;

  const binds = {
    descripcion: producto.descripcion,
    costo: producto.costo,
    peso: producto.peso,
    margen_ganancia: producto.margen_ganancia,
    cantidad: producto.cantidad,
    id_categoria: producto.id_categoria,
    id_material: producto.id_material
  };

  const result = await db.query(sql, binds);

  let message = 'Error in creating the Product';

  if (result && result.rowsAffected && result.rowsAffected > 0) {
    message = 'Product created successfully';
  }

  return { message };
}
//id_producto, descripcion, costo, peso, margen_ganancia, cantidad, id_categoria, id_material
async function update(id_producto, descripcion, costo, peso, margen_ganancia, cantidad, id_categoria, id_material) {
  const sql = `UPDATE productos SET 
    descripcion = NVL(:descripcion, descripcion),
    costo = NVL(:costo, costo),
    peso = NVL(:peso, peso),
    margen_ganancia = NVL(:margen_ganancia, margen_ganancia),
    cantidad = NVL(:cantidad, cantidad),
    id_categoria = NVL(:id_categoria, id_categoria),
    id_material = NVL(:id_material, id_material)
    WHERE id_producto = :id_producto`;

  const binds = {
    id_producto: id_producto,
    descripcion: descripcion,
    costo: costo,
    peso: peso,
    margen_ganancia: margen_ganancia,
    cantidad: cantidad,
    id_categoria: id_categoria,
    id_material: id_material
  };

  const result = await db.query(sql, binds);

  let message = 'Error in updating the Product';

  if (result && result.rowsAffected && result.rowsAffected > 0) {
    message = 'Product updated successfully';
  }

  return { message };
}

async function remove(id_producto) {
  const sql = `DELETE FROM productos WHERE id_producto = :id_producto`;

  const binds = { id_producto: id_producto };
  const result = await db.query(sql, binds);

  let message = 'Error in deleting the Product';

  if (result && result.rowsAffected > 0) {
    message = 'Product deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create, 
  update,
  remove,
}