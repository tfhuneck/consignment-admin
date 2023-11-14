const express   = require('express');
const router    = express.Router();
const getToken  = require('../services/ebayConvertRefreshToken');

router.route('/')
    .get(getToken)

module.exports = router; 