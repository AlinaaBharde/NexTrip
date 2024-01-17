const express = require('express');
const restaurantController = require('../controllers/restaurantController.js');
const requireAuth = require('../middleware/requireAuth.js');



const RestaurantsRouter = express.Router();


RestaurantsRouter.get('/fetch', restaurantController.fetchRestaurants);

RestaurantsRouter.post('/add/:planId', requireAuth, restaurantController.addRestaurant);

RestaurantsRouter.get('/display/:planId', requireAuth, restaurantController.displayRestaurant);

RestaurantsRouter.delete('/delete/:planId', requireAuth, restaurantController.deleteRestaurant);

module.exports = RestaurantsRouter;
