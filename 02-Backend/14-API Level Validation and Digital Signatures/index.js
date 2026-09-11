const express = require('express');
const main = require('./database.js');
const app = express();
const bcrypt = require('bcrypt');
require('dotenv').config({quiet : true});
const PORT = process.env.PORT || 5000;
require('./database.js');
const User = require('./models/users.js');
const validateUser = require('./utils/validateUser.js');

// data pasing 
app.use(express.json());

// default route or home route;
app.get('/', (req,res) => {
    res.send('Welcome To Home Page of API Level Validation and Digital Signatures : ')
})

// adding a user in DB;
app.post('/register', async (req,res) => {
    try {
        // API level validation : validation at the api level before hitting the db
        validateUser(req.body)


        // hashing password
        req.body.password = await bcrypt.hash(req.body.password,10)

        // Creating or storing the user in database 
        await User.create(req.body);
        res.send('User Registered Successfully :')
    } catch (error) {
        res.send(error)
        console.log('Error in User Registeration : ', error.message);
    }
})

//Getting all users in DB;
app.get('/users', async (req,res) => {
   try {
    const allUsers = await User.find();
    res.send(allUsers)
   } catch (error) {
    res.send('Error : ', error)
    console.log('Error in fetching users from DB : ', error.message);
   }
})
// login user 
app.post('/login', async (req,res) => {
    try {
        validateUser(req.body);
        const targetUser = User.findById(req.body._id);
        if(!(req.body.emailId == targetUser.emailId)) {
            throw new Error('Invalid Credentials')
        }

        const isAllowed = await bcrypt.compare(req.body.password, targetUser.password );
        if (!isAllowed) {
            throw new Error('Invalid Credentails')
        }
        res.send('Login Successfully ')
    } catch (error) {
        res.send('Error : ', error)
    }
})
// main function call for DB connection;
main()
.then(() => {
    app.listen(PORT,() => {
    console.log(`Server is listening at PORT : ${PORT}`);
})
})
.catch((error) => {
    console.log('Error in DB connection : ', error.message);
})
