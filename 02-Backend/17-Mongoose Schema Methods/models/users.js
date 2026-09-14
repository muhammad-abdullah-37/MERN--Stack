const mongoose  = require('mongoose');
require('dotenv').config({quiet : true});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY_FOR_COOKIE = process.env.SECRET_KEY_FOR_COOKIE;
const {Schema} = mongoose;


const userSchema = new Schema ({
    firstName : {
        type : String,
        minLength : 3,
        maxLength: 20,
        required : true

    },
    lastName : {
         type : String,
        minLength : 3,
        maxLength: 20,
    },
    emailId : {
         type : String,
        maxLength: 40,
        required : true
    },
    age : {
        type : Number,
        min : 14,
    },
    gender : {
         type : String,
         validate(value) {
            if (!(['male','female','others'].includes(value))) {
                throw new Error('Invalid Gender')
            }
         }
    },
    city : {
         type : String,
        minLength : 3,
        maxLength: 20,
    },
    password : {
        type : String,
        minLength : 8,
        required : true
    },
}, {timestamps : true})


// Mongoose Schema Methods 
// Method for generating jwt token
userSchema.methods.getJWT = function () {
    const answer = jwt.sign({_id : this._id, emailId : this.emailId, password : this.password}, SECRET_KEY_FOR_COOKIE, {expiresIn : 100});
    return answer
}

// Method for comparing the password
userSchema.methods.verifyPassword = async function (userPassword) {
    const answer = await bcrypt.compare(userPassword,this.password);
    return answer
}


// Creating Model or collection from the Schema 
const User = mongoose.model('user', userSchema);
module.exports = User;