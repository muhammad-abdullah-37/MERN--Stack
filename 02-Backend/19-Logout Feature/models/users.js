const mongoose = require('mongoose');
const {Schema} = mongoose;
const jwt = require('jsonwebtoken');
require('dotenv').config({quiet : true});
const SECRET_KEY_FOR_COOKIE = process.env.SECRET_KEY_FOR_COOKIE;

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
        maxLength : 20
    },
    emailId : {
        type : String,
        maxLength : 50,
        required : true,
        unique : true
    },
    city : {
        type : String,
        minLength : 3,
        maxLength : 30,
    },
    age : {
        type : Number,
        min : 14,
        required : true,
    },
    gender : {
        type : String,
        validate(value){
            if (!(['male','female','others'].includes(value))) {
                throw new Error('Inalid Gender')
            }
        }
    },
    password : {
        type : String,
        minLength : 8,
        required : true
    }
}, {timestamps : true})

// Mongoose schema methods
userSchema.methods.getJwtToken = function(){
    const answer = jwt.sign({_id : this.id, emailId : this.emailId, password : this.password},SECRET_KEY_FOR_COOKIE,{expiresIn : 100});
    return answer;
}
// Model
const User = mongoose.model('user', userSchema);

module.exports = User