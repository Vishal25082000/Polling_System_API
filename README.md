# Polling-System-API

This is a backend API for a polling system application. It is built using Node.js and MongoDB with the help of the Express framework.

## Installation
- Clone the repository using git clone https://github.com/Salonee-Jain/Polling-System-API.git
- Install dependencies using npm install
- Start the server using npm start

## Features
- Create a question (you can add as many questions as you want)
- Add options to a question
- Add a vote to an option of question
- Delete a question → (Will not deleted if one of it’s options has votes)
- Delete an option → (Will not be deleted if it has even one vote given to it)
- View a question with it’s options and all the votes given to it

## Required Routes
1. `/questions/create (To create a question)`
2. `/questions/:id/options/create (To add options to a specific question)`
3. `/questions/:id/delete (To delete a question)`
4. `/options/:id/delete (To delete an option)`
5. `/options/:id/add_vote (To increment the count of votes)`
6. `/questions/:id (To view a question and it’s options)`

## Usage
Use Postman or a similar tool to make HTTP requests to the API endpoints listed above.

## License
This project is licensed under the <a href="https://opensource.org/licenses/MIT" target="_new">MIT License</a>
