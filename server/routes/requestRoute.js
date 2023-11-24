const express       = require('express');
const router        = express.Router();
const auth          = require('../middleware/auth');
const getRequest    = require('../controllers/getCashoutRequest');
const cancelRequest = require('../controllers/cancelRequest');

router.route('/')
    .get(getRequest)
    .put(cancelRequest)

module.exports = router;