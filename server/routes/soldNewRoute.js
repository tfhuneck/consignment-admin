const express               = require('express');
const router                = express.Router();
const SoldNew            = require('../controllers/updateDataSold')

router.route('/')
    .get(SoldNew)

module.exports = router;