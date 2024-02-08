const formController = require('../controllers/formController.js');
const express = require('express');
const requireAuth = require('../middleware/requireAuth.js');

const Formrouter = express.Router();
Formrouter.post('/', requireAuth, formController.submitForm);

module.exports = Formrouter;