
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
require('dotenv').config({quiet : true})
const PORT = process.env.PORT || 5000;
const main = require('./database.js')
const User = require('./models/users.js')
const validateUsers = require('./utils/validateUser.js')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// DATA Parsing using middleware;
app.use(express.json());
app.use(cookieParser());

//default Route
app.get('/',(req,res) => {
    res.send('Welcome To Home Page for Learning JWT Tokens')
})


// Get request for Fetching All Users
app.get('/info', async (req,res) => {
    try {
       
        const allUsers = await User.find();
        res.send(allUsers);
    } catch (error) {
        res.send(`Error in Fetching Users : ${error.message}`)
    }
})



// getting a user based on ID 
app.get('/user', async (req,res) => {
    try {
          // Validating user by token 
        const payload = jwt.verify(req.cookies.token, 'Abdullah@123')
        // getting a user by id
        const targetUser  = await User.findById(payload._id);
        res.send(targetUser);
    } catch (error) {
        res.send(`Error in User Fetching : ${error.message} `)
    }
})


// POST request for creating a user
app.post('/register', async (req, res) => {
    try {
        // API Level validation for User Registeration;
        validateUsers(req.body)
        // Password hashing 
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedPassword;
        await User.create(req.body);
        res.send('User Registered Successfully : ');
    } catch (error) {
        console.log(`Error in User Registeration : ${error.message}`);
        res.send(`Error in User Registeration : ${error.message}`)
       
    }
})


// Delete request for Deleting a user
app.delete('/delete', async (req,res) => {
    try {
        await User.findByIdAndDelete(req.body._id);
        res.send('User Deleted')
    } catch (error) {
        res.send(`Error in User Deletion : ${error.message}`)
    }
})


// Put request for Updating the user
app.put('/update', async (req,res) => {
    try {
        const {_id, ...update} = req.body
        await User.findByIdAndUpdate(_id,update,{runValidators : true});
        res.send('User Updated Successfully')
    } catch (error) {
        res.send(`Error in User Updation : ${error.message}`)
    }

})


// Post request for User Login
app.post('/login', async(req,res) => {
    try {
        // Finding user by id for login
        const targetUser = await User.findOne({emailId : req.body.emailId});
        // Email verification for Login
        if (!(req.body.emailId == targetUser.emailId)) {
            throw new Error('Invalid Email') 
        }
        // Password verification for Login
        const isLoginAllowed = await bcrypt.compare(req.body.password, targetUser.password);
        if (!isLoginAllowed) {
            throw new Error('Invalid Password')
        }
        //JWT Token
        const token = jwt.sign({_id : targetUser._id, emailId : targetUser.emailId},'Abdullah@123', {expiresIn : 10})
        res.cookie("token", token)
        res.send('Logged In Successfully ')
    } catch (error) {
        res.send(`Error in User Login : ${error.message}`);
    }
})


// main Function call for DB connection 
main().
then(() => {
    app.listen(process.env.PORT,() => {
    console.log(`Server is listening at PORT : ${process.env.PORT}`);
})
})
.catch((error) => {
    console.log(`Error in DB Connection : ${error.message}`);
})

