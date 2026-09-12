const dns = require('dns');
dns.setServers(['8.8.8.8','1.1.1.1']);

const mongoose = require('mongoose');
require('dotenv').config({quiet : true});

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connection successfull');
    } catch (error) {
        console.log(`Error in DB connection : ` + error.message);
    }

}

module.exports = main;
