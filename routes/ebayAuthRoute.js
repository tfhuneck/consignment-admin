const express   = require('express')
const router    = express.Router();
const userToken = require('../services/ebayAuth')

router.route('/')
    .get(userToken)

module.exports = router;
