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

// =====routes===== 
app.use('/getusers', require('./routes/getUsersRoute'));
app.use('/active', require('./routes/getActiveRoute'));
app.use('/pending', require('./routes/getPendingRoute'));
app.use('/sold', require('./routes/getSoldRoute'));

// =========Setting up Server om port 8090============
app.listen(8090, () => {
    console.log('🔥🔥🔥🔥🔥Running on port 8090! - http://localhost:8080🔥🔥🔥🔥🔥');
    mongoose.connection.once('open', () => console.log('🌱🌱🌱🌱🌱MongoDB ConnectDb ran Successfully🌱🌱🌱🌱🌱'));
    // mongoose.connect(connection).then(()=> console.log('MongoDB connected'));
});