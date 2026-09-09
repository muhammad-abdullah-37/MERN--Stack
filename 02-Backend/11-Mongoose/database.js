const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
// STEPS while using Mongoose 
// Require Mongoose 
// Connect with the DB with mongoose using you connection String inside the main function 
// Create Schema (Class) for the Object which will be stored in the DB;
// Create the Model (Collection) using the Schema;
// Create the Document Object (User) which will be actually stored in DB;
// Save the Document Object in DB;

const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  //  Schema creation
  const UserSchema = new Schema({name: String,age: Number,city: String,gender: String,});

  // Model (Class) creation from schema or collection creation (Table)
  const User = mongoose.model("user", UserSchema);

  // Document(Object) creation from the Model(Class)
  const user1 = new User({name: "M Shan",age: 27,city: "Multan",gender: "male"});
  await user1.save();

  //   Creating and Saving the Document in single step
    await User.create({name : "Farham Javed", age : 25, city : "Bahawalpur", gender : 'male'})


    // Inserting Multiple documents at once 
    await User.insertMany([
        {name : 'Ali Arayz', age : 25, city : "Bahawalpur", gender : 'male'},
        {name : "Sameen Zahra" , age : 23, city : "Bahawalpur", gender : 'female'},
        {name : 'Muhammad Sameer', age : 25, city : "Turbat", gender : 'male'}
    ])
}

main()
  .then(() => {
    console.log("Successfully connected to DB : ");
  })
  .catch((error) => {
    console.log("Erro in DB connection : ", error);
  });
