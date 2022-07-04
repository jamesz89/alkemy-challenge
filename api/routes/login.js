// eslint-disable-next-line new-cap
const Router = require('express').Router();

Router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated()) ? 'Logged In' : 'Logged Out';
});

module.exports = Router;
