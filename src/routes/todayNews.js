const routs = require('express').Router();
const controller = require('../controllers');


routs.get('/NewsToday', controller.todayNewsCon);

module.exports = routs;
