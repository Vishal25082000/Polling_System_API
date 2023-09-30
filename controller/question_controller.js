const mongoose = require('mongoose')
const Question = require('../models/question')
const Option = require('../models/option')

// Function to create a new question
module.exports.create = async function(req, res) {
  try {
    // Create a new question with the title from the request body
    let question = await Question.create({
      title: req.body.title
    })
    // Return success response with the created question object
    return res.status(200).json({ 
      message: "Question Created", 
      data: question 
    })
  } catch (err) {
    console.log(err)
    // Return error response for any server errors
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}

// Function to delete a question
module.exports.delete = async function(req, res) {
    try {
      // Find the question by id and populate its options
      const question = await Question.findById(req.params.id).populate('options');
      if (!question) {
        // Return error response if the question is not found
        return res.status(404).json({ error: 'Question not found' });
      }
    
      // Check if any option in the question has votes
      question.options.map((o)=>{
        if(o.votes>=1){
        return res.status(403).json({ error: 'Cannot delete this question as it has votes' });
        }
      })  
      
      // Delete all the options of the question
      await Option.deleteMany({ _id: { $in: question.options } });
      
      // Delete the question itself
      await Question.findByIdAndDelete(req.params.id);
      
      // Return success response with deleted question object
      return res.status(200).json({ message: 'Question and Options deleted successfully' , data:question});
    } catch (err) {
      console.log(err);
      // Return error response for any server errors
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports.getQuestion = function(req, res){
    try{
      let question = Question.findById(req.params.id).populate('options');
      if(question){
        return res.status(200).json({question})
      }else{
        return res.status(404).json({message:"Question not found"})
      }

    }catch(err){
      return res.status(500).json({message:"Internal server error"})
      
    }
  }