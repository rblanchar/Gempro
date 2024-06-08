const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret); // Esta será tu llave secreta
