/*
* Run using the mongo shell. 
* Or using localhost:
*   mongo IT5007Tutorial scripts/init.mongo.js
*/

db.waitinglist.deleteMany({});

const initialWaitingList = [
    {id: 1, name: 'Lily', phone: '87735100', time: new Date('2019-01-15 06:00:00')},
    {id: 2, name: 'Tom', phone: '87735008', time: new Date('2019-01-15 06:02:00')},
    {id: 3, name: 'Keith', phone: '87725018', time: new Date('2019-01-15 06:03:00')},
];    

db.waitinglist.insertMany(initialWaitingList);
const count = db.waitinglist.count();
print('Inserted', count, 'initial waiting customers');


db.waitinglist.createIndex({ id: 1 }, { unique: true });
db.waitinglist.createIndex({ name: 1 });
db.waitinglist.createIndex({ phone:1 });
