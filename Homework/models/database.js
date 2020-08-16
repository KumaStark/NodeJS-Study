const mysql = require('mysql2');
const databaseSettings = require('../settings/database.json');
let NodeJS_db = mysql.createConnection(databaseSettings);
module.exports = NodeJS_db;