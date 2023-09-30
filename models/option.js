// Importing the Mongoose library
const mongoose = require('mongoose')

// Defining a new schema for the Option model
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  link_to_vote: {
    type: String,
  }
})

// Creating a new model based on the schema
const Option = mongoose.model("Option", optionSchema);

// Exporting the model for use in other modules
module.exports = Option;
