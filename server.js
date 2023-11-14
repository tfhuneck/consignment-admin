const express           = require('express');
const bodyParser        = require('body-parser')
const app               = express();
const path              = require('path');
const cors              = require('cors');
const axios             = require('axios');
const mongoose          = require('mongoose');
const connectDB         = require('./config/dbConn');
const updateActive      = require('./services/ebayActiveListApi')

// .env config
require('dotenv').config();

// Enviroment Port
const PORT = process.env.PORT || 8090;

// Connect to MongoDB
connectDB();

// cors policy
app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json({limit: "5mb"});
app.use(jsonParser);

// =====routes===== 
app.use('/static', express.static(path.join(__dirname, 'build' , 'static')));
app.use('/active', require('./routes/activeListingsRoute'));
app.use('/clearactive', require('./routes/clearActiveRoute'));
app.use('/sold', require('./routes/soldRoute'));
app.use('/pending', require('./routes/pendingRoute'));
app.use('/getusers', require('./routes/getUsersRoute'));
app.use('/pending', require('./routes/getPendingRoute'));
app.use('/updatesku', require('./routes/updateSkuRoute'));
app.use('/updateuser', require('./routes/updateUserRoute'));  // 
app.use('/addcashout', require('./routes/postCashoutRoute'));  // add cashout transaction to userprofile 
app.use('/ebaynotification', require('./routes/ebayNotificationRoute'))  // ebay notification challenge code route
app.use('/ebayauth', require('./routes/ebayAuthRoute'));  // ebay OAuth authorization code grant flow
app.use('/ebayauthconfirm', require('./routes/ebayGetUserTokenRoute')) // ebay user authorization redirect endpoint 
app.use('/usertoken', require('./routes/userTokenRoute'))  // save minted Usertoken to db and fetch userToken and RefreshToken
app.use('/refreshtoken', require('./routes/ebayRefreshTokenRoute')) //  ebay refresh token 

// // Route to index file
app.get(['/', '/dash', '/users', '/listings', '/transactions'], (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, './build')});
});

// trigger active listings api call
// updateActive();

// =========Setting up Server om port 8090============
app.listen(PORT, () => {
    console.log('🔥🔥🔥🔥🔥Running on port 8090! - http://localhost:8090🔥🔥🔥🔥🔥');
    mongoose.connection.once('open', () => console.log('🌱🌱🌱🌱🌱MongoDB ConnectDb ran Successfully🌱🌱🌱🌱🌱'));
    // mongoose.connect(connection).then(()=> console.log('MongoDB connected'));
});