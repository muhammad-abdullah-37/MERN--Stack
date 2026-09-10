// Setting DNS servers for the SRV string resolving;
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
// require mongoose
const mongoose = require('mongoose');
require('dotenv').config({quiet : true});

// Function for connecting with DB using mongoose;
async function main (){
   try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connection Successful : ');
   } catch (error) {
    console.log('Error in DB Connection : ', error.message);
   }
}

module.exports = main;