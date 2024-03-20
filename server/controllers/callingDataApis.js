const updateActive      = require('../services/ebayActiveListApi');
const updateSold        = require('../services/ebaySoldListApi');
const updatePending     = require('../services/ebayPendingListApi');
const updateAllUsers    = require('../controllers/updateAllUsers');
const updateUnsold      = require('../services/ebayUnsoldListApi');
const updateCanceled    = require('../services/ebayCanceledListApi')
const mainDbUpdates     = require('./maindbUpdate');
const updateImages      = require('./getItemImages')

const callData = async () => {

    setInterval( async () => {
        console.log('starting data call string');
    
        await updateActive();

        await updatePending();

        await updateSold();

        await updateUnsold();

        await updateCanceled();
    
        await mainDbUpdates();

        await updateAllUsers();

        await updateImages();
        
    }, 3600000);

// setTimeout( async () => {

//     await updateActive();

//     await updatePending();

//     await updateSold();

//     await updateUnsold();

//     await updateCanceled();
    
//     await mainDbUpdates();

//     await updateAllUsers();

//     await updateImages();

//     }, 30000)

};


module.exports = callData;
