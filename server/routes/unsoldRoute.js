const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const converter             = require('../middleware/convertUnsoldData');
const postUnSold            = require('../controllers/postUnsold');
const getUnsold             = require('../controllers/getUnsold');

router.route('/')
    .get(auth, getUnsold)
    .post(converter, postUnSold)

module.exports=router;