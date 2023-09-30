const express = require('express');
const router = express.Router();

const Question = require('../models/question');
const questionController = require('../controller/question_controller');

// Route for creating a new question
router.post('/create', questionController.create);
router.get('/:id', questionController.getQuestion)
// Route for deleting a question with the given ID
router.delete('/:id/delete',  questionController.delete);

// Mount the options router as a sub-router for the question router
router.use('/options', require('./option'));

module.exports = router;
