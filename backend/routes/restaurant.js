const express = require('express');
const restaurantController = require('../controllers/restaurantController.js');
const requireAuth = require('../middleware/requireAuth.js');



const RestaurantsRouter = express.Router();


RestaurantsRouter.get('/fetch', restaurantController.fetchRestaurants);

RestaurantsRouter.post('/add', requireAuth, restaurantController.addRestaurant);

RestaurantsRouter.delete('/delete', requireAuth, restaurantController.deleteRestaurant);

module.exports = RestaurantsRouter;
