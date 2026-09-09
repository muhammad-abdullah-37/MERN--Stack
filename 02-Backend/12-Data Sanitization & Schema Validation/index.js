const express = require('express');
const main = require('../11-Mongoose/database.js');
const app = express();
require('dotenv').config({quiet : true});
require('./database.js')
const PORT = parseInt(process.env.PORT) || 5000;




main()
.then( () => {
    app.listen(PORT, () => {
        console.log(`Server is listening at PORT : ${PORT}`);
    })
})
.catch((error) => {
    console.log(`Error in DB connection : ${error}`);
})