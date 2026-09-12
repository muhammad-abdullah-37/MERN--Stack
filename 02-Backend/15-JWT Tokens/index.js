
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
require('dotenv').config({quiet : true})
const PORT = process.env.PORT || 5000;
const main = require('./database.js')
const User = require('./models/users.js')
const validateUsers = require('./utils/validateUser.js')

// DATA Parsing using middleware;
app.use(express.json());

//default Route
app.get('/',(req,res) => {
    res.send('Welcome To Home Page for Learning JWT Tokens')
})
// Get request for Fetching All Users
app.get('/users', async (req,res) => {
    try {
        const allUsers = await User.find();
        res.send(allUsers);
    } catch (error) {
        res.send(`Error in Fetching Users : ${error.message}`)
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
// Post request for User Login
app.post('/login', async(req,res) => {
    try {
        // Finding user by id for login
        const targetUser = await User.findById(req.body._id);
        // Email verification for Login
        if (!(req.body.emailId == targetUser.emailId)) {
            throw new Error('Invalid Email')
        }
        // Password verification for Login
        const isLoginAllowed = await bcrypt.compare(req.body.password, targetUser.password);
        if (!isLoginAllowed) {
            throw new Error('Invalid Password')
        }
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

