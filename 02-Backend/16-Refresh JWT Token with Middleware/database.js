// Setting dns server for resolving the SRV string of Connection with MongoDB;
const dns = require('dns');
dns.setServers(['8.8.8.8','1.1.1.1']);
const mongoose = require('mongoose');
require('dotenv').config({quiet : true});

// Async function for the DB connection
async function main() {
   try {
     await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB Connection Successful`);
   } catch (error) {
    console.log(`Error in DB Connection : ${error.message}`);
   }
}

module.exports = main;