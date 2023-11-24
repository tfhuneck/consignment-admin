const express               = require('express');
const router                = express.Router();
const clearListings         = require('../controllers/clearActiveListings')

router.route('/')
    .get(clearListings)

module.exports = router;