import { Router } from 'express';
import yourPlansController from '../controllers/yourPlansController.js';

const PlansRouter = Router();

PlansRouter.get('/:username', yourPlansController.getYourPlans);

PlansRouter.delete('/:id', yourPlansController.deleteYourPlan);

export default PlansRouter;



