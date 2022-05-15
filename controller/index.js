const express = require('express');
const app = express();
const PORT = 3000;

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kainner#777"
});

connection.connect((error) => {
  if (error) throw error;
  console.log("connection to DB established");
});

//Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});