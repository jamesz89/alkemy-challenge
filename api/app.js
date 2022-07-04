const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysqlConnection = require('./connection');
const transactions = require('./routes/transactions');
const {auth} = require('express-openid-connect');
const login = require('./routes/login');

const app = express();

mysqlConnection.connect((error) => {
  if (error) throw error;
  console.log('connection to DB established');
});

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config));
app.use(cors());
app.use(bodyParser.json());

app.use('/api/transactions', transactions);
app.use('/api/login', login);

module.exports = app;
