const dns = require('dns');
dns.setServers(['8.8.8.8','1.1.1.1']);
const mongoose = require('mongoose');
require('dotenv').config({quiet : true});

// MongoDB connection
async function main(){
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log(`DB Connection Successful`);
    } catch (error) {
        console.log(`Error in DB Connection : ${error}`);
    }
}

module.exports = main;