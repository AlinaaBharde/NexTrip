const express = require('express');
const hotelController = require('../controllers/hotelController.js');
const requireAuth = require('../middleware/requireAuth.js');


const HotelsRouter = express.Router();

HotelsRouter.post('/fetch', hotelController.fetchHotel);

HotelsRouter.post('/add/:planId', requireAuth, hotelController.addHotel);

HotelsRouter.delete('/delete/:planId', requireAuth, hotelController.deleteHotel);

module.exports = HotelsRouter;
