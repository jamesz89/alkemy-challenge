const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kainner#777",
  database: "budget_manager"
});

module.exports = connection;