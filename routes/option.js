const express = require('express');
const router = express.Router();

const Option = require('../models/option'); // Import Option model
const optionController = require('../controller/option_controller'); // Import option controller

// Define routes for option-related operations
router.post('/:id/create', optionController.create); // Create a new option for a given question
router.delete('/:id/delete', optionController.delete); // Delete an option with the given ID
router.get('/:id/add_vote', optionController.addVote); // Add a vote to an option with the given ID

module.exports = router; // Export the router for use in the main app
