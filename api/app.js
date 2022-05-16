const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysqlConnection = require("./connection");
const transactions = require("./routes/transactions");

const app = express();

mysqlConnection.connect((error) => {
  if (error) throw error;
  console.log("connection to DB established");
});

app.use(cors());
app.use(bodyParser.json());

app.use("/api/transactions", transactions);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});