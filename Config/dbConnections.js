const mysql = require('mysql2');

const connectionDB = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "contact_list",
});


connectionDB.getConnection((err) => {
  if (err) {
    console.log("data base is not working", err);
  } else {
    console.log("MySql DataBase is connected successfully");
  }
});


module.exports = connectionDB;
