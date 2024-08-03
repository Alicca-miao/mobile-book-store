const mysql = require('mysql2');

const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'booklist'
};

const pool = mysql.createPool(mysqlConfig);
const promisePool = pool.promise();

module.exports = {
  mysqlConfig, // 导出 mysqlConfig
  promisePool // 导出 promisePool
};
