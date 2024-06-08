const db = require('./db');
const helper = require('../helper');
const config = require('../config');
/*const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DATE } = require('oracledb');*/

async function getById(id_factura) {
  const sql = `SELECT df.id_factura, p.id_producto, p.descripcion, df.cantidad, df.valor_unitario, df.iva, df.valor_total
                FROM detalle_facturas df
                JOIN productos p ON df.id_producto = p.id_producto
                WHERE df.id_factura = :Id_Factura`;

  const binds = { id_factura: id_factura };
  const result = await db.query(sql, binds);

  let message = 'Error in retrieving the Invoice Detail';

  if (result && result.rows.length > 0) {
    return result.rows;
  } else {
    return { message };
  }
}

async function create(detallefactura) {
  const sql = `INSERT INTO detalle_facturas (id_factura, id_producto, cantidad, valor_unitario, iva, valor_total)
                VALUES (:v_id_factura, :v_id_producto, :v_cantidad, :v_valUnitario, :v_iva, :v_valTotal)`;

  const binds = Object.values({
    ...detallefactura,
  });

  const result = await db.query(sql, binds);

  let message = 'Error in creating the Invoice Detail';

  if (result && result.rowsAffected && result.rowsAffected > 0) {
    message = 'Invoice Detail created successfully';
  }

  return { message };
}

async function remove(id_factura) {
    const sql = `DELETE FROM detalle_facturas WHERE id_factura= :id_factura`;
  
    const binds = { id_factura: id_factura };
    const result = await db.query(sql, binds);
  
    let message = 'Error in deleting the Invoice Detail';
  
    if (result && result.rowsAffected > 0) {
      message = 'Invoice Detail deleted successfully';
    }
  
    return { message };
  }

module.exports = {
  getById,
  create,
  remove
}