const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const getAllListings        = require('../controllers/getAllPending');

router.route('/')
    .get(auth, getAllListings)

module.exports = router;