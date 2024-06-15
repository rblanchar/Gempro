const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM usuarios ORDER BY id_usuario OFFSET ${offset} ROWS FETCH NEXT ${config.listPerPage} ROWS ONLY`, []
  );
  const data = helper.emptyOrRows(rows.rows);
  //const meta = {page};

  return {
    data,
    //meta
  }
}

async function getById(id_usuario) {
  const sql = `SELECT * FROM usuarios WHERE id_usuario = :id_usuario`;

  const binds = { id_usuario: id_usuario };
  const result = await db.query(sql, binds);

  let message = 'Error in retrieving the User';

  if (result && result.rows.length > 0) {
    return result.rows[0];
  } else {
    return { message };
  }
}

async function create(usuario) {
  const plainPassword = await bcrypt.hash(usuario.contrasena, 10);
  const sql = `
    INSERT INTO usuarios (id_usuario, cedula, nombre, apellidos, direccion, barrio, correo, telefono, nombre_usuario, contrasena, id_tipo) 
    VALUES (seq_id_usuario.NEXTVAL, :cedula, :nombre, :apellidos, :direccion, :barrio, :correo, :telefono, :nombre_usuario, :contrasena, :id_tipo)
  `;

  const binds = Object.values({
    ...usuario,
    contrasena: plainPassword
  });
  //console.log(binds);
  const result = await db.query(sql, binds);

  let message = 'Error in creating the user';

  if (result && result.rowsAffected && result.rowsAffected > 0) {
    message = 'User created successfully';
  }

  return { message };
}

async function login(usuario) {
  try {
    const result = await db.query(
      `SELECT id_usuario, nombre_usuario, contrasena FROM usuarios 
      WHERE nombre_usuario = :nombre_usuario`,
      [usuario.nombre_usuario]
    );

    const dbUser = result.rows[0];
    const mensaje = { mensaje: "Usuario/Contraseña incorrectos" };

    if (!dbUser) {
      return mensaje;
    }

    const esPasswordValido = await bcrypt.compare(usuario.contrasena, dbUser.CONTRASENA);

    if (!esPasswordValido) {
      return mensaje;
    }

    const token = jwt.sign( 
      { id_usuario: dbUser.id_usuario, nombre_usuario: dbUser.NOMBRE_USUARIO }, 
      config.llaveSecreta, 
      /*{ 
        expiresIn: "45m", 
      }*/ ); 
       
    return {token/*, nombre_usuario: dbUser.NOMBRE_USUARIO*/};

  } catch (error) {
    console.error('Error en login:', error.message);
    throw error;
  }

 
  
}

async function update(id_usuario, cedula, nombre, apellidos, direccion, barrio, correo, telefono, nombre_usuario, contrasena, id_tipo) {
  let hashedPassword = contrasena;

  if (contrasena) {
    hashedPassword = await bcrypt.hash(contrasena, 10);
  }
  const sql = `UPDATE usuarios SET 
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
    WHERE id_usuario = :id_usuario`;

  const binds = {
    id_usuario: id_usuario,
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

  let message = 'Error in updating the user';

  if (result && result.rowsAffected && result.rowsAffected > 0) {
    message = 'User updated successfully';
  }

  return { message };
}

async function remove(id_usuario) {
  const sql = `DELETE FROM usuarios WHERE id_usuario = :id_usuario`;

  const binds = { id_usuario: id_usuario };
  const result = await db.query(sql, binds);

  let message = 'Error in deleting the usuary';

  if (result && result.rowsAffected > 0) {
    message = 'Usuary deleted successfully';
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