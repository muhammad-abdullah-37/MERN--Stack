const mongoose = require('mongoose');
require('dotenv').config({quiet : true})


// DB connection 
async function main () {
   await mongoose.connect(process.env.MONGO_URI);
   console.log('Successfully connected to DB : ');
}

module.exports = main;