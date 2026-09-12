const mongoose = require('mongoose');
const {Schema} = mongoose;


// Schema Creation
const userSchema = new Schema({
    firstName : {
        type: String,
        minLength : 3,
        maxLength : 20,
        required : true,
    },
    lastName : {
        type: String,
        minLength : 3,
        maxLength : 20,
    },
    emailId : {
        type: String,
        maxLength :50,
        required : true,
        unique: true,
    },
    city : {
        type: String,
        minLength : 3,
        maxLength : 20,
    },
    gender : {
        type: String,
        required : true,
        validate(value) {
            if (!['male','female','others'].includes(value)) {
                throw new Error('Invalid Gender')
            }
        }
    },
    age : {
        type: String,
        min : 14,
        required : true,
    },
    password : {
        type: String,
        minLength : 8,
        required : true,
    }
})

// Creating model or collection (table in MYSQL);

const User = mongoose.model('user', userSchema)


module.exports = User;