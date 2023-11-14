const express               = require('express');
const router                = express.Router();
const challengeResponse     = require('../services/ebayChallenge')
const ebaynotification      = require('../services/ebayNotification')

router.route('/')
    .get(challengeResponse)
    .post(ebaynotification)

module.exports = router;