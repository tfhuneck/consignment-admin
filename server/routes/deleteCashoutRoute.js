const express               = require('express');
const router                = express.Router();
const deleteTransaction     = require('../controllers/deleteTransaction');

router.route('/')
    .post(deleteTransaction)

module.exports = router;
