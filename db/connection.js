const mysql = require('mysql2');
const {readFileSync} = require('fs')

data = readFileSync('./mykey.txt', encoding='UTF-8');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: data,
  database: 'staff'
});

module.exports = db;