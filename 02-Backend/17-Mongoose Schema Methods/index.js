const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config({quiet : true});
const cookieParser = require('cookie-parser');
const main = require('./database.js');
const User = require('./models/users.js');
const authUser = require('./utils/validateUsers.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY_FOR_COOKIE = process.env.SECRET_KEY_FOR_COOKIE;



// Data parsing using the middleware 
app.use(express.json());
app.use(cookieParser());


// Default Route
app.get('/', (req,res) => {
    res.send('Welcome to Home Page of Mongoose Schema Methods and Environment Variables');
})

// Getting all info from DB
app.get('/info', async(req,res) => {
    try {
        const infomation = await User.find();
        res.send(infomation);
    } catch (error) {
        res.send(`Error in Fetching Info : ${error.message}`);
    }
})


// POST Request for Registering a User 
app.post('/register', async(req,res) => {
    try {
        // API Level validation before user creation
        authUser(req.body);
        // Password Hashing
        const hashedPassowrd = await bcrypt.hash(req.body.password,11);
        req.body.password = hashedPassowrd;
        // Creating or registering user
        await User.create(req.body);
        res.send('User Registered Successfully : ');
    } catch (error) {
        res.send(`Error in User Registeration : ${error.message}`)
    }
})



// User Login
app.post('/login', async (req,res) => {
    try {
        const {emailId, password} = req.body;
        if (!(emailId)) {
            throw new Error('Email Required')
        }
        if (!(password)) {
            throw new Error('Password Required')
        }

        const targetUser = await User.findOne({emailId : emailId});
        // Mongoose Schema Method for verifying password;
        const isLoginAllowed = targetUser.verifyPassword(password);
        if (!isLoginAllowed) {
            throw new Error('Invalid Credentials')
        }
        // Email verification
        if (!(emailId == targetUser.emailId)) {
            throw new Error('Invalid Credentials')
        }

        // Mongoose Schema Methd for getting the jwt token;  
        const token = targetUser.getJWT()
        // Sending Token with Cookie
        res.cookie('token', token);     
        res.send(`User Logged In Successfully`)
    } catch (error) {
        res.send(`Error in User Login : ${error.message}`)
    }
})

// Geting a single user data
app.get('/user', async(req,res) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            throw new Error('Invalid Token')
        }
        const payload = jwt.verify(token, SECRET_KEY_FOR_COOKIE);
        const targetUser = await User.findById(payload._id)
        res.send(targetUser)
    } catch (error) {
        res.send(`Error in User Fetching : ${error.message}`)
    }
})

// Delete reques for Deleting a user
app.delete('/user', async(req,res) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            throw new Error('Invalid Token')
        }
       const payload =  jwt.verify(token,SECRET_KEY_FOR_COOKIE);
       await User.findByIdAndDelete(payload._id);
        res.send('User Deleted Successfully')
    } catch (error) {
        res.send(`Error in Deleting the User : ${error.message}`)
    }
})

// Put request for updating a user
app.put('/user', async(req,res) => {
    try {
        const {token} = req.cookies;
        const update = req.body;
        const payload = jwt.verify(token, SECRET_KEY_FOR_COOKIE);
        const targetUser = await User.findByIdAndUpdate(payload._id,update, {runValidators : true} )
        res.send('User Updated Successfully')
    } catch (error) {
        res.send(`Error in Updating User : ${error.message}`)
    }
})
main()
.then(() => {
    app.listen(PORT,() => {
        console.log(`Server is listening at PORT : ${PORT}`);
    })
})
.catch((error) => {
    console.log(`Error in DB connection  : ${error.message}`);
})