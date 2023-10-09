const express               = require('express');
const router                = express.Router();
const GetPending             = require('../controllers/getPending');

router.route('/')
    .get(GetPending)

module.exports = router;
