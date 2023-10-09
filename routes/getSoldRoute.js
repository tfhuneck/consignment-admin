const express               = require('express');
const router                = express.Router();
const GetSold              = require('../controllers/getSold');

router.route('/')
    .get(GetSold)

module.exports = router;
