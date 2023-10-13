const express               = require('express');
const router                = express.Router();
const updateSku             = require('../controllers/updateSku');

router.route('/')
    .post(updateSku)

module.exports = router;