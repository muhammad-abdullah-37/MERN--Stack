const express = require('express');
const app = express();
require('dotenv').config({quiet : true});
const PORT  = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const main = require('./database.js');
const User = require('./models/users.js');
const validateUser = require('./utils/validateUser.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Data Parsing using Middleware
app.use(express.json());
app.use(cookieParser());


// Default Route
app.get('/', (req,res) => {
    res.send('Referesh JWT Tokens with Middleware');
});


// Get Request for getting the all info or users in DB;
app.get('/info', async (req,res) => {
    try {
        const info = await User.find();
        res.send(info);
    } catch (error) {
        res.send(`Erorr in Info Fetching`);
    }
})

//Fetching a single user based on ID;
app.get('/user', async (req,res) => {
    try {
        console.log('hello from jwt');
        const payload = jwt.verify(req.cookies.token, 'Hello')
        const targetUser = await User.findById(payload._id)
        res.send(targetUser)
    } catch (error) {
        res.send(`Error in User Fetching : ${error.message}`)
    }
})


// Creating or Registering a user
app.post('/register', async(req,res) => {
    try {
        // API level validation before registring user
        validateUser(req.body);
        // Hashing password before stroing in DB;
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;
        // Creating the User
        await User.create(req.body);
        res.send('User Registered Successfully')
    } catch (error) {
        res.send(`Error in User Registeration : ${error.message}`)
    }
})


// Deleting a User with ID 
app.delete('/user/:id',async(req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.send('User Deleted')
    } catch (error) {
        res.send(`Error in User Deletion : ${error.message}`);
    }
})
// PUT request for Updating a user
app.put('/user',async (req,res) => {
    try {
        const {id, ...Update} = req.body;
        await User.findByIdAndUpdate(id,Update, {runValidators : true} )
        res.send('User Updated Successfully');
    } catch (error) {
        res.send(`Error in User Updation : ${error.message}`)
    }
})


// POST reques for User Login
app.post('/login', async(req,res) => {
    try {
        const targetUser = await User.findOne({emailId : req.body.emailId});
        // Email verification for Login
        if (!(req.body.emailId == targetUser.emailId )) {
            throw new Error('Invalid Credentials')
        }
        const isLoginAllowed = await bcrypt.compare(req.body.password, targetUser.password);
        console.log('Hello');
        if (!isLoginAllowed) {
            throw new Error('Invalid Credentials')
        }
        // Generating a JWT token
        const jwtToken = jwt.sign({_id : targetUser._id, emailId : targetUser.emailId}, 'Hello',{expiresIn : 10});
        res.cookie("token",jwtToken);
        res.send('User Logged In Successfully')
    } catch (error) {
        res.send(`Login Failed : ${error.message}`)
    }
})
// Function call for DB Connection
main()
.then(() => {
    app.listen(PORT, () => {
    console.log(`Server is Listening at PORT : ${PORT}`);
});
})
.catch((error) => {
    console.log(`Error in DB Connection : ${error.message}`);
})