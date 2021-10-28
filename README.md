## Tutorial5 Project execute
Zhuo Yixuan A0242703N

Execute the following code to start web.

### Clone the repository and install package
`git https://github.com/Yeseniazhuo/HotelWaitinglist.git`

`npm install`

### init and start mongodb
start mongodb：
`screen mongod`

initiate database：
`mongo IT5007Tutorial scripts/init.mongo.js`

### Test the CRUD (after starting mongoDB)
`node scripts/trymongo.js`

### Start Web
transfrom .jsx to .js：
`npx babel src --presets @babel/react --out-dir public`

start the Web：
`npm start`
