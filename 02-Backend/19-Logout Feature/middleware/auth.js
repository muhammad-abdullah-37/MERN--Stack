const express = require('express');
const bcrypt = require('bcrypt');
const userAuth = require('../utils/validateUsers');
const User = require('../models/users.js');
const authRoute = express.Router();


// Creating or registering a user 
authRoute.post('/register',async(req,res) => {
    try {
        // API Level Validation
        userAuth(req.body)
        // Password Hashing
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;
        await User.create(req.body);
        res.send('User Registered Successfully')
    } catch (error) {
        res.send(`Error in User Registeration : ${error.message}`)
    }
})

// Post request for user login
authRoute.post('/login', async (req,res) => {
    try {
        const {emailId,password} = req.body;
        if (!(emailId)) {
            throw new Error('Email required')
        }
        if (!(password)) {
            throw new Error('Password required')
        }
         if (!(await User.findOne({emailId : emailId}))) {
            throw new Error('Invalid Credentials')
        }
        const targetUser = await User.findOne({emailId : emailId});
        const isLoginAllowed = await bcrypt.compare(password,targetUser.password)
        if (!(isLoginAllowed)) {
            throw new Error('Invalid Credentials')
        }
        const token = targetUser.getJwtToken();
        res.cookie("token",token)
        res.send('Login Successful : ')
    } catch (error) {
        res.send(`Error in User Login : ${error.message} `)
    }
})

// Logout Feature
authRoute.post('/logout', async (req,res) => {
    try {
        // res.cookie('token','this is an expired cookie');
        res.cookie("token",null, {expires : new Date (Date.now())})
        res.send('Logged Out Successfully')
    } catch (error) {
        res.send(`Error in Logout : ${error.message}`)
    }
})

module.exports = authRoute;