const express           = require('express');
const bodyParser        = require('body-parser')
const app               = express();
const cors              = require('cors');
const axios             = require('axios');
const mongoose          = require('mongoose');
const connectDB         = require('./config/dbConn');

// Config
require('dotenv').config();

// Connect to MongoDB
connectDB();

// cors policy
app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json({limit: "5mb"});
app.use(jsonParser);

// =====routes===== 
app.use('/getusers', require('./routes/getUsersRoute'));
app.use('/active', require('./routes/getActiveRoute'));
app.use('/pending', require('./routes/getPendingRoute'));
app.use('/sold', require('./routes/getSoldRoute'));
app.use('/updatesku', require('./routes/updateSkuRoute'));
app.use('/updateuser', require('./routes/updateUserRoute'));
app.use('/addcashout', require('./routes/postCashoutRoute'));

// =========Setting up Server om port 8090============
app.listen(8090, () => {
    console.log('🔥🔥🔥🔥🔥Running on port 8090! - http://localhost:8080🔥🔥🔥🔥🔥');
    mongoose.connection.once('open', () => console.log('🌱🌱🌱🌱🌱MongoDB ConnectDb ran Successfully🌱🌱🌱🌱🌱'));
    // mongoose.connect(connection).then(()=> console.log('MongoDB connected'));
});