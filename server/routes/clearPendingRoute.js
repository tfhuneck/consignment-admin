const express               = require('express');
const router                = express.Router();
const clearListings         = require('../controllers/clearPendingCache')

router.route('/')
    .get(clearListings)

module.exports = router;