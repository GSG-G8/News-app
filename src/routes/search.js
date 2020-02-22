const routes = require('express').Router();
const controllers = require('../controllers');

routes.post('/search', controllers.searchCon);

module.exports = routes;
