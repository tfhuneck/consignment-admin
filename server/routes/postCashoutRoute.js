const express               = require('express');
const router                = express.Router();
const CashoutTransaction    = require('../controllers/postCashout');

router.route('/')
    .post(CashoutTransaction)

module.exports = router;
