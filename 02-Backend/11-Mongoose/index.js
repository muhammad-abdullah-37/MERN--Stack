const express = require('express');
const app = express();
require('dotenv').config({quiet : true});
require('./database.js')
const main = require('./database');
const User = require('./models/users.js');
const { set } = require('mongoose');

const PORT = parseInt(process.env.PORT) || 5000;

app.use(express.json())

// Get request for Getting all data
app.get('/info', async (req,res) => {
   try {
    const data = await User.find({});
    res.send(data)
   } catch (error) {
    console.log('Error in getting data from DB: ', error);
   }
});

// Post request for adding new data
app.post('/info', async (req,res) => {
    try {
        const user1 = new User(req.body)
        await user1.save()
        // using create method
        // await User.create(req.body)
        res.send('Data added successfully')
    } catch (error) {
        console.log(`Error in resourcr creation : `, error);
    }
})

// Delete request for deleting a resource
app.delete('/info/:id', async (req,res) => {
    try {
        const id  = req.params.id;
        await User.findByIdAndDelete(id);
        res.send('Data deleted successfully ')
    } catch (error) {
        console.log('Error in deleting the resourcr: ',error);
    }
})

// patch request for updating the resource
app.put('/info/:id', async (req,res) => {
    try {
        const updatedUser = await User.updateOne({_id : req.params.id},
            {$set : {name  :  req.body.name, city : req.body.city}});
            res.send('Patches applied')
    } catch (error) {
        console.log('Error in updating the resource: ', error);
    }
})



main()
.then(() => {
    app.listen(PORT, () => {
    console.log(`Server is listening at PORT : ${PORT} `);
})
})
.catch((error) => {
    console.log("Erro in DB connection : ", error);
  });
