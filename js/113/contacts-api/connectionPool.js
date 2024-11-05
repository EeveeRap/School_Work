const mysql = require('mysql2/promise');
const debug = require('debug')('contacts-api:connectionPool');

const pool = module.exports = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'nodeuser5',
  /*waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,*/
});

pool.on('acquire', connection => {
  debug(`connection ${connection.threadId} acquired`);
});

pool.on('connection', connection => {
  debug(`connection ${connection.threadId} connected`);
});

pool.on('enqueue', connection => {
  debug(`connection ${connection.threadId} enqueue`);
});

pool.on('release', connection => {
  debug(`connection ${connection.threadId} released`);
});
