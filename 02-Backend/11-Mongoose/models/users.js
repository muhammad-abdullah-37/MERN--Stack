const mongoose = require("mongoose");
const { Schema } = mongoose;

//  Schema creation
  const UserSchema = new Schema({name: String,age: Number,city: String,gender: String,});

   // Model (Class) creation from schema or collection creation (Table)
  const User = mongoose.model("user", UserSchema);

  module.exports = User;