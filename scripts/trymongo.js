// run with: node scripts/trymongo.js

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/IT5007Tutorial';


async function testWithAsync() {
  console.log('\n----------------------- MongoDB CRUD test ----------------------\n');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    // Connecting test
    console.log('\n------------------Connecting test------------------ ')
    await client.connect();
    console.log('Connected to MongoDB! \n');
    const db = client.db();
    const collection = db.collection('waitinglist');

    

    // clear the waitinglist for further operation and inser one
    console.log('\n--------Clear and insert data sampe testing--------')
    await collection.deleteMany({});
    const initialWaitingList = [
        {id: 1, name: 'Lily', phone: '87735100', time: new Date('2019-01-15 06:00:00')},
        {id: 2, name: 'Tom', phone: '87735008', time: new Date('2019-01-15 06:02:00')},
        {id: 3, name: 'Keith', phone: '87725018', time: new Date('2019-01-15 06:03:00')},
    ];    
    const result = await collection.insertMany(initialWaitingList);
    const initdocs = await collection.find({}).toArray();
    console.log('Result of insert:\n', initdocs);


    // read the waitinglist
    console.log('\n------------------Read testing------------------')
    const docs = await collection.find({id:1}).toArray();
    console.log('Result of find id:1 :\n', docs);

    //delete one in the waitinglist
    console.log('\n------------------Delete testing------------------')
    console.log('Deleting all information of Lily!');
    await collection.deleteOne({name: "Lily"});
    const deletedDocs  = await collection.find({}).toArray();
    console.log('Result of delete:\n', deletedDocs);

    //update one in the waitinglist
    console.log('\n------------------Update testing-----------------')
    console.log("Updating Tom's Phone number!");
    await collection.updateOne({name: "Tom"},{$set: {phone:'11111111'}});
    const updatedDocs = await collection.find({}).toArray();
    console.log('Result of update:\n', updatedDocs);
    
    // Finish
    console.log("\n------------------Okay!!!Finished!!! ------------------\n");

    //Clear all the collections again
    await collection.deleteMany({});

  } catch(err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithAsync()