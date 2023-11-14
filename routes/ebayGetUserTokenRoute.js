const express   = require('express')
const router    = express.Router();
const userCode = require('../services/ebayAuthConfirm')

router.route('/')
    .get(userCode)

module.exports = router;
