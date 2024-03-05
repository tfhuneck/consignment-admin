const express           = require('express');
const bodyParser        = require('body-parser')
const app               = express();
const path              = require('path');
const cors              = require('cors');
const axios             = require('axios');
const mongoose          = require('mongoose');
const connectDB         = require('./config/dbConn');
const runDataCalls      = require('./controllers/callingDataApis')

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
app.use(express.static(path.join(__dirname, 'build')));
app.use('/listingdata', require('./routes/listingDataRoute'))
app.use('/active', require('./routes/activeListingsRoute'));
app.use('/clearactive', require('./routes/clearActiveRoute'));
app.use('/clearpending', require('./routes/clearPendingRoute'));
app.use('/clearunsold', require('./routes/clearUnsoldRoute'));
app.use('/clearsold', require('./routes/clearSoldRoute'));
app.use('/sold', require('./routes/soldRoute'));
app.use('/unsold', require('./routes/unsoldRoute'));
app.use('/sold', require('./routes/soldRoute'));
app.use('/pending', require('./routes/pendingRoute'));
app.use('/canceled', require('./routes/canceledRoute'));
app.use('/getuser', require('./routes/getUserRoute'));
app.use('/getusers', require('./routes/getUsersRoute'));
app.use('/updatesku', require('./routes/updateSkuRoute'));
app.use('/updateuser', require('./routes/updateUserRoute'));  // Triggers update User function that calls several update function to update User profile collection 
app.use('/updateuseractive', require('./routes/updateUserActiveRoute'));  // updates user's active listings
app.use('/updateusersold', require('./routes/updateUserSoldRoute'));  // updates user's sold listings
app.use('/updateuserunsold', require('./routes/updateUserUnSoldRoute'));  // updates user's unsold listings
app.use('/updateuserpending', require('./routes/updateUserPendingRoute'));  // updates user's pending listings
app.use('/updateuserbalance', require('./routes/updateUserBalanceRoute'));  // updates user's balance / payout records
app.use('/analysis', require('./routes/AnalysisRoute')); //updating analysis file with curren stats
app.use('/updateusercurrentbalance', require('./routes/updateUserCurrentBalanceRoute'));  // calculates and updates user's current balance
app.use('/addcashout', require('./routes/postCashoutRoute'));  // add cashout transaction to userprofile 
app.use('/deletecashout', require('./routes/deleteCashoutRoute'));  // delete cashout transaction from userprofile 
app.use('/ebaynotification', require('./routes/ebayNotificationRoute'))  // ebay notification challenge code route
app.use('/ebayauth', require('./routes/ebayAuthRoute'));  // ebay OAuth authorization code grant flow
app.use('/ebayauthconfirm', require('./routes/ebayGetUserTokenRoute')) // ebay user authorization redirect endpoint 
app.use('/usertoken', require('./routes/userTokenRoute'))  // save minted Usertoken to db and fetch userToken and RefreshToken
app.use('/refreshtoken', require('./routes/ebayRefreshTokenRoute')) //  ebay refresh token 
app.use('/request', require('./routes/requestRoute')); 
app.use('/image', require('./routes/ebayGetImageRoute')); // retrieve image url from ebay api with item id
app.use('/activeimages', require('./routes/acticeImagesRoute'));
app.use('/soldimages', require('./routes/soldImagesRoute'));
app.use('/pendingimages', require('./routes/pendingImagesRoute'));
app.use('/unsoldimages', require('./routes/unsoldImagesRoute'));
app.use('/apptoken', require('./routes/appTokenRoute'));

// serving static files with page routes from index files
app.get(['/', '/dash', '/users', '/listings', '/listings/:userid', '/transactions', '/transactions/:userid', '/cashouts'], (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, './build')});
});

app.use('/activenew', require('./routes/activeNewRoute')); // new active update to main db endpoint
app.use('/pendingnew', require('./routes/pendingNewRoute')); // new pending update to main db endpoint
app.use('/soldnew', require('./routes/soldNewRoute')); // new sold update to main db endpoint
app.use('/unsoldnew', require('./routes/unsoldNewRoute')); // new unsold update to main db endpoint
app.use('/canceled', require('./routes/canceledRoute')); // new active update to main db endpoint

// +++++++++++++++++++++++++ Misc ++++++++++++++++++++++++++++++
app.get('/canceledfill', require('./services/ebayCancelFill'))
app.get('/testupdate', require('./updateDb'));
app.get('/report', require('./report'));

// runDataCalls(); // calling ebay api calls and updating Database;

// =========Setting up Server om port 8090============
app.listen(PORT, () => {
    console.log('🔥🔥🔥🔥🔥Running on port 8090! - http://localhost:8090🔥🔥🔥🔥🔥');
    mongoose.connection.once('open', () => console.log('🌱🌱🌱🌱🌱MongoDB ConnectDb ran Successfully🌱🌱🌱🌱🌱'));
    // mongoose.connect(connection).then(()=> console.log('MongoDB connected'));
});