## Tutorial5 Project execute
Zhuo Yixuan A0242703N

### Clone the repository
`git clone https://github.com/Yeseniazhuo/IT5007Tutorial.git`

### init and start mongodb
start mongodb：
`screen mongod`

initiate：
`mongo IT5007Tutorial scripts/init.mongo.js`

### Test the CRUD (after starting mongoDB)
`node scripts/trymongo.js`

### Start Web
transfrom from jsx to js：
`npx babel src --presets @babel/react --out-dir public`

start the Web：
`npm start`
