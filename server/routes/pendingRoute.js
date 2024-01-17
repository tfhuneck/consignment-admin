const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const converter             = require('../middleware/convertPendingData');
const postPending           = require('../controllers/postPendingCache');
const getPending            = require('../controllers/getPending');
const updatePending         = require('../controllers/updatePendingListings')

router.route('/')
    .get(auth, getPending)
    .post(converter, postPending)
    .put(updatePending)

module.exports=router;