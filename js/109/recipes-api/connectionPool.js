const mysql = require('mysql2/promise');
const debug = require('debug')('contacts-api:connectionPool');

const pool = module.exports = mysql.createPool({
    host: 'localhost',
  user: 'nodeuser5',
  password: 'test123',
  database: 'nodeuser5'
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