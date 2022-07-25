const sql = require('mssql');

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  server: process.env.SERVER_ADDRESS,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: false,
    enableArithAbort: true,
  },
};

const pool = new sql.ConnectionPool(sqlConfig);
const connectionPool = pool
  .connect()
  .then(conn => {
    console.log('데이터 베이스 접속 성공');
    return conn;
  })
  .catch(error => console.log('데이터 베이스 접속 실패 : ', error));

module.exports = { connectionPool };
