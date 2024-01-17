const { Router } = require('express');
const weatherController = require('../controllers/weatherController.js');

const weatherRouter = Router();

weatherRouter.post('/fetch', weatherController.fetchWeather);

module.exports = weatherRouter;