// DNS resolving for the SRV string resolving in the connection string
const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1']);


const express = require('express');
const mongoose = require('mongoose');
const main = require('./database.js');
const app = express();
require('dotenv').config({quiet : true});
require('./database.js');
const User = require('./models/users.js');
const PORT = parseInt(process.env.PORT) || 5000;

// Data Parsing
app.use(express.json());

// Home route or default route
app.get('/', (req,res) => {
    res.send('Welcome to Home Page :')
})


// Creating or registering the user
app.post('/register', async (req,res) => {
    try {
        await User.create(req.body);
        res.send('User Registered Successfully')
    } catch (error) {
        console.log(`Error in user registeration : ${error}`);
        res.send(`Error in user registeration : ${error.message}`)
    }
})


// Getting or reading all users 
app.get('/users', async (req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        console.log(`Error in Fetching Data : ${error}`);
        res.send(`Error in Fetching Data : ${error}`)
    }
})

// Getting users based on ID 
app.get('/user/:id', async (req,res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        res.send(targetUser);
    } catch (error) {
        console.log(`Error in Fetching user by ID : ${error.message}`);
        res.send(`Error in Fetching user by ID : ${error.message}`)
    }
})

// Deleting a user based on ID 
app.delete('/user/:id', async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send('User Deleted Successfully')
    } catch (error) {
        console.log(`Error in deleting User : ${error.message}`);
        res.send(`Error in deleting User : ${error.message}`)
    }
})
// Updating user based ID
app.patch('/user', async (req,res) => {
    const {_id, ...update} = req.body;
    try {
            await User.findByIdAndUpdate(_id,update,{"runValidators" : true})
            res.send('User updated Successfully')
    } catch (error) {
        console.log(`Error in updating the user : ${error.message}`);
        res.send(`Error in updating the user : ${error.message}`)
    }

})
// DB Connection;
main()
.then( () => {
    app.listen(PORT, () => {
        console.log(`Server is listening at PORT : ${PORT}`);
    })
})
.catch((error) => {
    console.log(`Error in DB connection : ${error}`);
})