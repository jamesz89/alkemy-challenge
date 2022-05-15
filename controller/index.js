const express = require('express');
const app = express();
const PORT = 3000;

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kainner#777",
  database: "budget_manager"
});

connection.connect((error) => {
  if (error) throw error;
  console.log("connection to DB established");
});

//Routes
app.get('/', (req, res) => {
  res.send('Budget Manager App - Alkemy FullStack Challenge');
});

app.get('/transactions', (req, res) => {
  connection.query('SELECT * FROM `transactions`', (error, results) => {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});