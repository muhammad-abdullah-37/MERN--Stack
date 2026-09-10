const mongoose = require('mongoose');
const {Schema} = mongoose;


// Creating the User Schema 
const userSchema = new Schema ({
    firstName : {

    },
    lastName : {

    },
    emailId : {

    },
    city : {

    },
    gender : {

    },
    age : {

    }
})


// Model or Collection (table in mySQL) Creation using the Schema;
const User = mongoose.model('user', userSchema);


module.exports = User;