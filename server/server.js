const express           = require('express');
const bodyParser        = require('body-parser')
const app               = express();
const path              = require('path');
const cors              = require('cors');
const axios             = require('axios');
const mongoose          = require('mongoose');
const connectDB         = require('../../config/dbConn');
const updateActive      = require('./services/ebayActiveListApi');
const updateSold        = require('./services/ebaySoldListApi');
const updatePending        = require('./services/ebayPendingListApi');
const updateAllUsers    = require('../../controllers/updateAllUsers');

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
app.use('/clearpending', require('./routes/clearPendingRoute'));
app.use('/sold', require('./routes/soldRoute'));
app.use('/pending', require('./routes/pendingRoute'));
app.use('/getusers', require('./routes/getUsersRoute'));
app.use('/updatesku', require('./routes/updateSkuRoute'));
app.use('/updateuser', require('./routes/updateUserRoute'));  // Triggers update User function that calls several update function to update User profile collection 
app.use('/updateuseractive', require('./routes/updateUserActiveRoute'));  // updates user's active listings
app.use('/updateusersold', require('./routes/updateUserSoldRoute'));  // updates user's sold listings
app.use('/updateuserpending', require('./routes/updateUserPendingRoute'));  // updates user's pending listings
app.use('/updateuserbalance', require('./routes/updateUserBalanceRoute'));  // updates user's balance / payout records
app.use('/updateusercurrentbalance', require('./routes/updateUserCurrentBalanceRoute'));  // calculates and updates user's current balance
app.use('/addcashout', require('./routes/postCashoutRoute'));  // add cashout transaction to userprofile 
app.use('/ebaynotification', require('./routes/ebayNotificationRoute'))  // ebay notification challenge code route
app.use('/ebayauth', require('./routes/ebayAuthRoute'));  // ebay OAuth authorization code grant flow
app.use('/ebayauthconfirm', require('./routes/ebayGetUserTokenRoute')) // ebay user authorization redirect endpoint 
app.use('/usertoken', require('./routes/userTokenRoute'))  // save minted Usertoken to db and fetch userToken and RefreshToken
app.use('/refreshtoken', require('./routes/ebayRefreshTokenRoute')) //  ebay refresh token 

// serving static files with page routes from index files
app.get(['/', '/dash', '/users', '/listings', '/transactions'], (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, './build')});
});

// endpoint to fetch active listings from ebay every 10min
updateActive();

// endpoint to fetch sold listings from ebay every 1h
updateSold();

// endpoint to fetch pending listings from ebay every 1h
updatePending();

// endpoint to update all users evey 1h 
updateAllUsers();

// =========Setting up Server om port 8090============
app.listen(PORT, () => {
    console.log('🔥🔥🔥🔥🔥Running on port 8090! - http://localhost:8090🔥🔥🔥🔥🔥');
    mongoose.connection.once('open', () => console.log('🌱🌱🌱🌱🌱MongoDB ConnectDb ran Successfully🌱🌱🌱🌱🌱'));
    // mongoose.connect(connection).then(()=> console.log('MongoDB connected'));
});