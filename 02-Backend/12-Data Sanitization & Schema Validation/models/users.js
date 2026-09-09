const mongoose = require('mongoose');
const {Schema} = mongoose;


// Creating Schema
const userSchema = new Schema({
    name : String,
    age : Number,
    city : String,
    gender : String
})


// Creating model or collection or table from the Schema
const User = mongoose.model('user', userSchema);

module.exports = User;