const express               = require('express');
const router                = express.Router();
const GetUser              = require('../controllers/getUser');

router.route('/')
    .get(GetUser)

module.exports = router;

