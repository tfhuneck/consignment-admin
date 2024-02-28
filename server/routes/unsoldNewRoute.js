const express               = require('express');
const router                = express.Router();
const UnsoldNew            = require('../controllers/updateDataUnSold')

router.route('/')
    .get(UnsoldNew)

module.exports = router;