const express = require('express');
const planningpageController = require('../controllers/planningpageController');
const requireAuth = require('../middleware/requireAuth')


const planningpageRouter = express.Router();

planningpageRouter.get('/fetch/:planId', requireAuth, planningpageController.fetchData);

module.exports = planningpageRouter;
