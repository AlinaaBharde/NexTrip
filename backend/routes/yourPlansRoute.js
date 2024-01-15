const express = require('express')
const yourPlansRouter = require('../controllers/planController')

const PlansRouter = express.Router();

PlansRouter.get('/:username', yourPlansRouter.getYourPlans);

PlansRouter.delete('/:id', yourPlansRouter.deleteYourPlan);

module.exports = PlansRouter;
