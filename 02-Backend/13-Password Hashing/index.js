const express = require('express');
const app = express();
require('dotenv').config({quiet : true});
const PORT = parseInt(process.env.PORT) || 5000


app.use(express.json());


// Default Route or Home route
app.get('/', (req,res) => {
    res.send('Welcome To Home Page')
})


// Server listening
app.listen(PORT, () => {
    console.log(`Server is listening at PORT : ${PORT}`);
})