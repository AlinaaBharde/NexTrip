const { Router } = require('express');
const newsController = require('../controllers/newsController.js');

const newsRouter = Router();

newsRouter.post('/fetch', newsController.fetchNews);

module.exports = newsRouter;