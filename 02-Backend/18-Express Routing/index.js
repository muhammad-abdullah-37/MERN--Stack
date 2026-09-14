const express = require('express');
const app = express();
require('dotenv').config({quiet : true});
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
const main = require('./database.js');
const User = require('./models/users.js')
const authRoute = require('./middleware/auth.js');
const userRoute = require('./middleware/user.js');
const infoRoute = require('./middleware/info.js');


// Data Parsing
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/',authRoute);
app.use('/',userRoute);
app.use('/',infoRoute);


main()
.then(() => {
    app.listen(PORT,() => {
    console.log(`Server is Listening at PORT : ${PORT}`);
})
})
.catch((error) => {
    console.log(`Error in DB Connection : ${error.message}`);
})





