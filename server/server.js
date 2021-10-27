const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/IT5007Tutorial';

let db;

let aboutMessage = "Hotel WaitingList API v1.0";


const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    waitlist,
  },
  Mutation: {
    setAboutMessage,
    customerAdd,
    customerDelete
  },
  GraphQLDate,
};



function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function waitlist() {
  const waitinglist = await db.collection('waitinglist').find({}).toArray();
  return waitinglist;
}

// ------------------- Add -------------------- //

async function customerAdd(_,{customer}) {
  const waitinglist = await db.collection('waitinglist').find({}).toArray();
  const currentlen = waitinglist.length;
  var i = 1;
  customer.time = new Date();
  while(i<=currentlen+1)
  {
    temp_cus = await db.collection('waitinglist').find({id:i}).toArray();
    if (temp_cus.length!=0){console.log(i,'----',currentlen+1), i=i+1; }
    else {customer.id = i; break;}  
  }
  await db.collection('waitinglist').insertOne(customer);
  //if (db.waitinglist.count()<=25){alert('submit sucessful!')}
  //else{alert('Error: exceed max entries!')}
  const insertedCustomer = await db.collection('waitinglist').findOne({id:customer.id});
  return insertedCustomer;
}

// ------------------- Delete -------------------- //
async function customerDelete(_,{id}) {
  temp_cus = await db.collection('waitinglist').find({id:id});
  temp_cus_list = temp_cus.toArray();
  if (temp_cus_list.length!= 0)
  {
    await db.collection('waitinglist').deleteOne({id: id});
    console.log('Delete successful');
  } //delete the first one    
  newList = await db.collection('waitinglist').find({}).toArray();
  return newList;
}


async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();