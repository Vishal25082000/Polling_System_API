// Importing express module
const express = require('express');
// Creating router object
const router = express.Router();
// Importing mongoose module
const mongoose = require('mongoose')
// Importing Option model
const Option = require('../models/option')
// Importing homeController
const homeController = require('../controller/home_controller')
// Importing optionController
const optionController = require('../controller/option_controller')

// Setting up route for home page
router.get('/', homeController.home);

// Setting up routes for questions and options using their respective router files
router.use('/questions', require('./question'))
router.use('/options', require('./option'))

// Exporting router object
module.exports = router;