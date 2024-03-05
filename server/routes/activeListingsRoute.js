const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const converter             = require('../middleware/convertListingData');
const updateCache           = require('../controllers/updateActiveCache');
const updateActive          = require('../controllers/updateActiveListings')

router.route('/')
    .post(converter, updateCache)
    .put(updateActive)

module.exports = router;