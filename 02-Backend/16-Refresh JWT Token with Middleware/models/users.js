const mongoose = require('mongoose');
const {Schema} = mongoose;

// Creating the User Schema 
const userSchema = new Schema({
    firstName : {
        type : String,
        minLength : 3,
        maxLength : 20,
        required : true
    },
    lastName : {
        type : String,
        minLength : 3,
        maxLength : 20,
    },
    emailId : {
        type : String,
        maxLength : 50,
        required : true,
        unique : true,
    },
    city : {
        type : String,
        minLength : 3,
        maxLength : 20,
    },
    gender : {
        type : String,
        validate(value){
            if (!(['male','female','others'].includes(value))) {
                throw new Error('Invalid Gender');
            }
        }
    },
    age : {
        type : Number,
        min : 14,
    },
    password : {
        type : String,
        minLength : 8,
        required : true,
    }
})

// Creating model or collection (table MySQL);
const User = mongoose.model('user',userSchema);

module.exports = User;

