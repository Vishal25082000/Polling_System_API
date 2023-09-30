const mongoose = require('mongoose')
const Option = require('../models/option');
const Question = require('../models/question')

// Controller function to create an option for a given question
module.exports.create = async function (req, res) {
  let question = await Question.findById(req.params.id);
  // Check if the question exists
  if (question) {
    try {
      // Create the option with the provided text
      let option = await Option.create({
        text: req.body.text
      })
      // Set the link for the vote for the option
      option.link_to_vote = `http://localhost:8000/options/${option._id}/add_vote`;
      option.save();
      // Push the option to the question's options array
      question.options.push(option._id);
      question.save();
      // Return the created option
      return res.json(option)
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Internal server error'
      })
    }
  } else {
    // If the question doesn't exist, return an error
    return res.status(404).json({
      error: 'Cannot find question'
    })
  }
}

// Controller function to delete an option
module.exports.delete = async function (req, res) {
  try {
    // Find the option with the provided ID
    let option = await Option.findById(req.params.id);
    if (option) {
      // Check if the option has any votes
      if (option.votes < 1) {
        // Find the question that contains the option
        let question = await Question.findOne({ options: { $elemMatch: { $eq: req.params.id } } })
        if (question) {
          // Delete the option and remove it from the question's options array
          await Option.findByIdAndDelete(req.params.id);
          await Question.updateOne({ _id: question._id }, { $pull: { options: { $in: req.params.id } } });
          return res.json({ message: "Option deleted successfully", data: option });
        }
      } else {
        // If the option has votes, return an error
        return res.status(403).json({
          error: 'Option votes are given, cannot delete it'
        })
      }
    } else {
      // If the option doesn't exist, return an error
      return res.status(404).json({
        error: 'Cannot find option'
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}

// Controller function to add a vote to an option
module.exports.addVote = async function (req, res) {
  try {
    // Find the option with the provided ID
    let option = await Option.findById(req.params.id);
    if (option) {
      // Increment the votes count for the option and save it
      option.votes += 1;
      option.save();
      return res.json({ message: "Vote added to option", data: option });
    } else {
      // If the option doesn't exist, return an error
      return res.status(404).json({
        error: 'Option not found'
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}
