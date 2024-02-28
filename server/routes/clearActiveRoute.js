const express               = require('express');
const router                = express.Router();
const clearListings         = require('../controllers/clearActiveCache')

router.route('/')
    .get(clearListings)

module.exports = router;