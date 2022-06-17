const Router = require('express').Router();
const bcrypt = require('bcrypt');
const connection = require("../connection");

Router.post('/', (req, res) => {
  const newUser = {
    username: req.body.username,
    password: req.body.password
  };

  connection.query(`SELECT EXISTS(SELECT * FROM users WHERE username = '${newUser.username}') as 'exists'`, async (error, result) => {
    if (error) throw error;

    const userFound = result[0].exists;

    if (userFound) return res.status(409).send({ "message": "username already exists" });
  
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

    connection.query(`INSERT INTO users (username, password) VALUES ('${newUser.username}', '${passwordHash}')`, (error) => {
      if (error) throw error;
      return res.status(200).send({
        "message": "new user created"
      });
    });
  });
});

module.exports = Router;