const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const converter             = require('../middleware/convertUnsoldData');
const postUnSold            = require('../controllers/postUnsold');

router.route('/')
    .post(converter, postUnSold)

module.exports=router;