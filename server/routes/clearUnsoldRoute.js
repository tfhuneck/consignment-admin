
const express               = require('express');
const router                = express.Router();
const clearListings         = require('../controllers/clearUnsoldCache')

router.route('/')
    .get(clearListings)

module.exports = router;