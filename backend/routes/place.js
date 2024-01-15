const express = require('express');
const placeController = require('../controllers/placeController');


const placeRouter = express.Router();

placeRouter.post('/fetch', placeController.fetchPlaces);

module.exports = placeRouter;