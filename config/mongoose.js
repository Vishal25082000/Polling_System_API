const mongoose = require('mongoose');

// Connect to the MongoDB database using mongoose.connect() method and specify the database URL and options
mongoose.connect('mongodb+srv://karan:karan@cluster0.gfuxd.mongodb.net/?retryWrites=true&w=majority', 
{ 
useNewUrlParser: true,
useUnifiedTopology: true,
}
);

// Store the default connection in a variable named db
const db = mongoose.connection;

// Listen for any errors that may occur in the database connection and log them to the console
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

// Once the connection is established, log a message to the console indicating the successful connection
db.once('open', () => {
    console.log('MongoDB connected');
  });

// Export the db object for use in other files
module.exports = db;
