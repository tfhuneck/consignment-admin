const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const converter             = require('../middleware/convertSoldData');
const postSold              = require('../controllers/postSold');

router.route('/')
    .post(converter, postSold)

module.exports=router;