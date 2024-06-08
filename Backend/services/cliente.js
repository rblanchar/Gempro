const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM clientes ORDER BY id_cliente OFFSET ${offset} ROWS FETCH NEXT ${config.listPerPage} ROWS ONLY`, []
  );
  const data = helper.emptyOrRows(rows.rows);
  //const meta = {page};

  return {
    data,
    //meta
  }
}

async function getById(id_cliente) {
    const sql = `SELECT * FROM clientes WHERE id_cliente = :id_cliente`;
  
    const binds = { id_cliente: id_cliente };
    const result = await db.query(sql, binds);
  
    let message = 'Error in retrieving the Client';
  
    if (result && result.rows.length > 0) {
      return result.rows[0];
    } else {
      return { message };
    }
  }

async function create(cliente) {
    const plainPassword = await bcrypt.hash(cliente.contrasena, 10);
  const sql = `
    INSERT INTO clientes (id_cliente, cedula, nombre, apellidos, direccion, barrio, correo, telefono, nombre_usuario, contrasena, id_tipo) 
    VALUES (seq_id_cliente.NEXTVAL, :cedula, :nombre, :apellidos, :direccion, :barrio, :correo, :telefono, :nombre_usuario, :contrasena, :id_tipo)
  `;

  const binds = Object.values({
    ...cliente,
    contrasena: plainPassword,
    id_tipo: '4'
  });
  //console.log(binds);
  const result = await db.query(sql, binds);

  let message = 'Error in creating the user';

  if (result && result.rowsAffected && result.rowsAffected > 0) {
    message = 'Client created successfully';
  }

  return { message };
}

async function login(cliente) {
  try {
    const result = await db.query(
      `SELECT id_cliente ,nombre_usuario, contrasena FROM clientes 
      WHERE nombre_usuario = :nombre_usuario`,
      [cliente.nombre_usuario]
    );

    const dbUser = result.rows[0];
    const mensaje = { mensaje: "Usuario/Contraseña incorrectos" };

    if (!dbUser) {
      return mensaje;
    }

    const esPasswordValido = await bcrypt.compare(cliente.contrasena, dbUser[2]);

    if (!esPasswordValido) {
      return mensaje;
    }

    const token = jwt.sign( 
      { id_cliente: dbUser.id_cliente, nombre_usuario: dbUser.nombre_usuario }, 
      config.llaveSecreta, 
      { 
        expiresIn: "15m", 
      } ); 
    return token;

  } catch (error) {
    console.error('Error en login:', error.message);
    throw error;
  }

 
  
}

async function update(id_cliente, cedula, nombre, apellidos, direccion, barrio, correo, telefono, nombre_usuario, contrasena, id_tipo) {
  let hashedPassword = contrasena;

  if (contrasena) {
    hashedPassword = await bcrypt.hash(contrasena, 10);
  }
  const sql = `UPDATE clientes SET 

    cedula = NVL(:cedula, cedula),
    nombre = NVL(:nombre, nombre),
    apellidos = NVL(:apellidos, apellidos),
    direccion = NVL(:direccion, direccion),
    barrio = NVL(:barrio, barrio),
    correo = NVL(:correo, correo),
    telefono = NVL(:telefono, telefono),
    nombre_usuario = NVL(:nombre_usuario, nombre_usuario),
    contrasena = NVL(:contrasena, contrasena),
    id_tipo = NVL(:id_tipo, id_tipo)
    WHERE id_cliente = :id_cliente`;

  const binds = {
    id_cliente: id_cliente,
    cedula: cedula,
    nombre: nombre,
    apellidos: apellidos,
    direccion: direccion,
    barrio: barrio,
    correo: correo,
    telefono: telefono,
    nombre_usuario: nombre_usuario,
    contrasena: hashedPassword,
    id_tipo: id_tipo
  };


  const result = await db.query(sql, binds);

  let message = 'Error in updating the Client';

  if (result && result.rowsAffected && result.rowsAffected > 0) {
    message = 'Client updated successfully';
  }

  return { message };
}

async function remove(id_cliente) {
  const sql = `DELETE FROM clientes WHERE id_cliente = :id_cliente`;

  const binds = { id_cliente: id_cliente };
  const result = await db.query(sql, binds);

  let message = 'Error in deleting the Client';

  if (result && result.rowsAffected > 0) {
    message = 'Client deleted successfully';
  }

  return { message };
}



module.exports = {
  getMultiple,
  getById,
  create,
  update,
  remove,
  login
}