const express               = require('express');
const router                = express.Router();
const GetActive              = require('../controllers/getActive');

router.route('/')
    .get(GetActive)

module.exports = router;
