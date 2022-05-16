const Router = require('express').Router();
const connection = require("../connection");

Router.get('/', (req, res) => {
  connection.query("SELECT * FROM `transactions`", (error, results) => {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

Router.post('/', (req, res) => {
  const transaction = {
    concept: req.body.concept,
    amount: req.body.amount,
    date: req.body.date,
    type: req.body.type,
    categoryId: req.body.categoryId
  };

  connection.query(`
  INSERT INTO transactions (concept, amount, date, type, categoryId) 
  VALUES (
    "${transaction.concept}", 
    ${transaction.amount}, 
    "${transaction.date}", 
    "${transaction.type}", 
    ${transaction.categoryId})`,
    (error) => {
      if (error) throw error;
    });

  connection.query(`SELECT * FROM transactions WHERE id=LAST_INSERT_ID()`, (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
  });
});

Router.delete('/:id', (req, res) => {
  const id = req.params.id;

  connection.query(`DELETE FROM transactions WHERE id=${id};`, (error, results) => {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

Router.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  connection.query(`UPDATE transactions
	SET concept="${body.concept}",
  amount=${body.amount},
  date="${body.date}",
  type="${body.type}",
  categoryId=${body.categoryId}
	WHERE id=${id};`,
    (error) => {
      if (error) throw error;
    });
  connection.query(`SELECT * FROM transactions WHERE id=LAST_INSERT_ID()`, (error, result) => {
    if (error) throw error;
    res.status(200).json(result);
  });
});

module.exports = Router;