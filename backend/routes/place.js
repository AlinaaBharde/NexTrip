const express = require('express');
const placeController = require('../controllers/placeController');


const placeRouter = express.Router();

placeRouter.post('/fetch', placeController.fetchPlaces);

placeRouter.post('/add/:planId', requireAuth, placeController.addPlaces);

placeRouter.delete('/delete/:planId', requireAuth, placeController.deletePlaces);

module.exports = placeRouter;