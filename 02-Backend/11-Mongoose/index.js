const express = require('express');
const app = express();
require('dotenv').config({quiet : true});
require('./database.js')
const main = require('./database');
const User = require('./models/users.js');

const PORT = parseInt(process.env.PORT) || 5000;

app.use(express.json())

app.get('/info', async (req,res) => {
    const data = await User.find({});
    res.send(data)
});



main()
.then(() => {
    app.listen(PORT, () => {
    console.log(`Server is listening at PORT : ${typeof PORT} `);
})
})
.catch((error) => {
    console.log("Erro in DB connection : ", error);
  });
