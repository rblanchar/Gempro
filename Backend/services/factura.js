const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const dbm= require('../Models/config-db');

//const Factura   = require('../Models/factura');
/*const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DATE } = require('oracledb');*/

async function getMultiple(page = 2) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT f.id_factura,f.fecha,c.cedula,c.nombre,c.apellidos,u.nombre_usuario,f.subtotal,f.total_pagar
      FROM facturas f
      JOIN clientes c
      ON f.id_cliente = c.id_cliente
      JOIN usuarios u
      ON f.id_usuario = u.id_usuario 
      ORDER BY id_factura DESC OFFSET ${offset} ROWS FETCH NEXT ${config.listPerPage} ROWS ONLY`, []
  );
  const data = helper.emptyOrRows(rows.rows);
  //const meta = {page};

  return {
    data,
    //meta
  }
}

async function getById(id_factura) {
  const sql = `SELECT f.id_factura,TRUNC(f.fecha),c.cedula,c.nombre,c.apellidos,u.nombre_usuario,f.subtotal,f.total_pagar
                FROM facturas f
                JOIN clientes c
                ON f.id_cliente = c.id_cliente
                JOIN usuarios u
                ON f.id_usuario = u.id_usuario
                WHERE f.id_factura= : id_factura`;

  const binds = { id_factura: id_factura };
  const result = await db.query(sql, binds);

  let message = 'Error in retrieving the Invoice';

  if (result && result.rows.length > 0) {
    return result.rows;
  } else {
    return { message };
  }
}

async function create(factura) {
  const sql = `
    INSERT INTO facturas (id_factura, fecha, id_cliente, id_usuario, subtotal, total_pagar) 
    VALUES (seq_id_factura.NEXTVAL, TRUNC(SYSDATE), :id_cliente, :id_usuario, :subtotal, :total_pagar)
  `;

  const binds = Object.values({
    ...factura,
  });

  const result = await db.query(sql, binds);

  let message = 'Error in creating the Invoice';

  if (result && result.rowsAffected && result.rowsAffected > 0) {
    message = 'Invoice created successfully';
  }

  return { message };
}

/*
async function create(data) {
  
  const result = await dbm.sequelize.query("SELECT seq_id_factura.NEXTVAL as ID_FACTURA FROM DUAL", {
    type: dbm.sequelize.QueryTypes.SELECT
  });

  const nuevaFactura = await dbm.Factura.create({
    ...data,
    ID_FACTURA:result[0].ID_FACTURA,
    fecha: new Date().toISOString().slice(0, 10) // Solo año, mes y día
  });
  return nuevaFactura;
}
*/
async function proximoIdFactura() {
  try {
    const sql = "SELECT last_number FROM USER_SEQUENCES WHERE sequence_name = 'SEQ_ID_FACTURA'";
    const result = await db.query(sql, []);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw new Error('No se encontró la secuencia SEQ_ID_FACTURA');
    }
  } catch (error) {
    console.error('Error al obtener el próximo ID de factura:', error.message);
    throw error;
  }
}


module.exports = {
  getMultiple,
  getById,
  create,
  proximoIdFactura
}