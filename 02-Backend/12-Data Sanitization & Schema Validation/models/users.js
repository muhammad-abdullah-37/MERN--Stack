const mongoose = require('mongoose');
const {Schema} = mongoose;


// Creating Schema
const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 50,
        trim :true,
    },
    lastName : {
        type : String,
        minLength : 3,
        maxLength : 50,
        trim : true,
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        maxLength : 100,
        trim : true,
        lowercase : true,
        immutable : true
    },
    age : {
        type : Number,
        min : 14,
        max : 70,
        tirm : true
    }, 
    gender : {
        type : String,
        // enum : ['male', 'female', 'others']
        validate(value){
            if(!['male', 'female', 'others'].includes(value))
                throw new Error('Invalid gender')
        }
    },
    city : {
        type : String,
        minLength : 3,
        maxLength : 50,
    },
    photo : {
        type : String,
        default : 'This is the default photo'
    },
    password : {
        type : String,
        required : true,
        minLength : 8,
        tirm : true
    }
}, {timestamps : true})


// Creating model or collection or table from the Schema
const User = mongoose.model('user', userSchema);

module.exports = User;