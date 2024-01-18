const { Router } = require('express');
const eventController = require('../controllers/eventController.js');

const eventRouter = Router();

eventRouter.post('/fetch', eventController.fetchEvents);

module.exports = eventRouter;