const express = require('express');
const app = express();
require('dotenv').config({quiet : true});
require('./database.js')
const main = require('./database');
const User = require('./models/users.js');

const PORT = parseInt(process.env.PORT) || 5000;

app.use(express.json())

// Get request for Getting all data
app.get('/info', async (req,res) => {
    const data = await User.find({});
    res.send(data)
});

// Post request for adding new data
app.post('/info', async (req,res) => {
    const user1 = await User.create({
        name : req.body.name,
        age : req.body.age,
        city: req.body.city,
        gender : req.body.gender
    })
    res.send('Data added successfully')
})

// Delete request for deleting a resource
app.delete('/info/:id', async (req,res) => {
    const id  = req.params.id;
    await User.findByIdAndDelete(id);

    res.send('Data deleted successfully ')
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
