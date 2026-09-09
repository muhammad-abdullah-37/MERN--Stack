const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'MERN-Stack';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');

  // the following code examples can be pasted here...

  // const findResult = collection.find({});
  // for (const doc of findResult) {
  //   console.log(doc);
  // }

  // Getting data from the Mongodb cluster
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  // Inserting data in the cluster
  // Inserting one document 
  // const insertResult = await collection.insertOne({name : 'Shahazaib Khadim', city : 'Kashmir', age : 22})
  // console.log('Inserted documents => ', insertResult);

  // Inserting many documents at once
  // const insertMany = await collection.insertMany([{name : 'Areeb Khan', city : "Bahawalpur", age : 22}, {name : 'Ghasif Shahzad', city : 'Lahore', age : 23}, {name : 'Hamza', city : 'Dera Ismail Khan', age : 23}])
  // console.log(insertMany);
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());