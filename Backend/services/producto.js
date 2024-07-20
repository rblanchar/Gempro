const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple() {
  const rows = await db.query(
    `SELECT * FROM productos ORDER BY id_producto`, []
  );
  const data = helper.emptyOrRows(rows.rows);

  return {
    data
  };
}
async function getMultiplePersonalizado() {
  const rows = await db.query(
    `select p.id_producto, p.descripcion, ((p.costo * p.margen_ganancia) + p.costo) as valor_unitario, p.cantidad, 
      c.nombre as categoria, m.nombre as material, p.imagen 
      from productos p
      join categoria_productos c
      on p.id_categoria = c.id_categoria
      join materiales m
      on p.id_material = m.id_material
      order by p.id_producto`, []
  );
  const data = helper.emptyOrRows(rows.rows);

  return {
    data
  };
}

async function create(producto) {
  const sql = `
    INSERT INTO productos (id_producto, descripcion, costo, peso, margen_ganancia, cantidad, id_categoria, id_material) 
    VALUES (seq_id_producto.NEXTVAL, :descripcion, :costo, :peso, :margen_ganancia, :cantidad, :id_categoria, :id_material)
  `;

  const binds = {
    descripcion: producto.descripcion,
    costo: producto.costo,
    peso: parseFloat(producto.peso),
    margen_ganancia: parseFloat(producto.margen_ganancia),
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
  getMultiplePersonalizado,
  create,
  update,
  remove,
}