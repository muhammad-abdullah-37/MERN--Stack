const express = require('express');
const app = express();
require('dotenv').config({quiet : true})
const PORT = process.env.PORT || 5000;

// DATA Parsing using middleware;
app.use(express.json());

app.get('/',(req,res) => {
    res.send('Welcome To Home Page for Learning JWT Tokens')
})
app.listen(PORT, () => {
    console.log('Server is listening at PORT : ',PORT);
})