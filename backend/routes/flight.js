const { Router } = require('express');
const flightController = require('../controllers/flightController.js');

const FlightsRouter = Router();

FlightsRouter.post('/fetch', flightController.fetchFlights);

module.exports = FlightsRouter;
