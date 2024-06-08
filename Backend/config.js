const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      //host: "localhost:1521",
      
      connectString: 'localhost:1521/XEPDB1',
      database: 'GEMPRO',
      user: 'administrador',
      password: '12345',
      dialect: 'oracle',
      connectTimeout: 60000
    },
    llaveSecreta: 'd1c91fb878446a06d62ca6091aed310e2c1e430efcad9a4ab71ba03a6d0875b494c449482a1c6871f383b56e32c76feca7b889674e2d582fb17532c8b5c932a9',
    listPerPage: 10,
  };

  
  module.exports = config;
