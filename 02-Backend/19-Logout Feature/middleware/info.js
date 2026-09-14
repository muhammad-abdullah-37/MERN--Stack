const express = require('express');
const infoRoute = express.Router();
const User  = require('../models/users.js');


//Getting all info 
infoRoute.get('/info', async(req,res) => {
    try {
        const info = await User.find();
        res.send(info)
    } catch (error) {
        res.send(`Error in Fetching Info : ${error.message}`)
    }
})

module.exports = infoRoute