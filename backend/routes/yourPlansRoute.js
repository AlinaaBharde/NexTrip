const express = require('express')
const yourPlansRouter = require('../controllers/planController')
const requireAuth = require('../middleware/requireAuth')

const PlansRouter = express.Router();

PlansRouter.get('/', requireAuth, yourPlansRouter.getYourPlans);

PlansRouter.delete('/:id', yourPlansRouter.deleteYourPlan);

module.exports = PlansRouter;
