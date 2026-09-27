const mongoose = require('mongoose');
const {Schema} = mongoose;

const fileSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String
    },
    tags : {
        type : String
    },
    email : {
        type : String
    }
})


const File = mongoose.model('file', fileSchema);

module.exports = File;