const express               = require('express');
const router                = express.Router();
const converter             = require('../middleware/convertListingData');
const updateListings        = require('../controllers/updateActiveListings');
const getListings           = require('../controllers/getActive');

router.route('/')
    .get(getListings)
    .post(converter, updateListings)

module.exports = router;