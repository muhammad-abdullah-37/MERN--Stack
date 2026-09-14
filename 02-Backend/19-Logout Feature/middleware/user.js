const express = require('express');
const userRoute = express.Router();
const SECRET_KEY_FOR_COOKIE = process.env.SECRET_KEY_FOR_COOKIE;
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');


// Getting a single user info
userRoute.get('/user', async(req,res) => {
    try {
       const payload =  jwt.verify(req.cookies.token,SECRET_KEY_FOR_COOKIE);
       const targetUser = await User.findOne({emailId : payload.emailId})
       res.send(targetUser)
    } catch (error) {
        res.send(`Error in user fetching : ${error.message}`)
    }
})

// Deleting a user 
userRoute.delete('/user', async(req,res) => {
    try {
        const payload = jwt.verify(req.cookies.token,SECRET_KEY_FOR_COOKIE);
        await User.findByIdAndDelete(payload._id)
        res.send('User Deleted')
    } catch (error) {
        res.send(`Error in deleting user : ${error.message}`)
    }
})

// updating the user
userRoute.put('/user', async(req,res) => {
    try {
        const payload = jwt.verify(req.cookies.token,SECRET_KEY_FOR_COOKIE);
        await User.findByIdAndUpdate(payload._id,req.body, {runValidators : true});
        res.send('User updated successfully : ')
    } catch (error) {
        res.send(`Error in updating user : ${error.message}`)
    }
})

module.exports = userRoute;