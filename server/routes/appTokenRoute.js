const express = require('express');
const router = express.Router();
const token = require('../services/ebayAppToken');

router.route('/')
    .get(token)

module.exports = router;