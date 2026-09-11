const mongoose = require('mongoose');
const {Schema} = mongoose;


// Creating the User Schema 
const userSchema = new Schema ({
    firstName : {
        type : String,
        minLength : 3,
        maxLength : 50,
        required : true,
    },
    lastName : {
        type : String,
        minLength : 3,
        maxLength : 50,

    },
    emailId : {
        type : String, 
        required : true,
        maxLength : 50,
        unique : true,
        lowercase : true,
    },
    city : {
        type : String,
        maxLength : 50,
        minLength : 3,

    },
    gender : {
        type : String, 
        // enum : ['male', 'female', 'others'],
        valdate  : () => {
            if (!['male', 'female', 'others'].includes(value)) {
                throw new Error ('Invalid gender')
            }
        }
    },
    age : {
        type : Number,
        min : 14,
        max : 70,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minLength : 8,
    }
})


// Model or Collection (table in mySQL) Creation using the Schema;
const User = mongoose.model('user', userSchema);


module.exports = User;