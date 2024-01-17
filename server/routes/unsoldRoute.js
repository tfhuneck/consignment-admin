const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const converter             = require('../middleware/convertUnsoldData');
const postUnSold            = require('../controllers/postUnsoldPost');
const getUnsold             = require('../controllers/getUnsold');

router.route('/')
    .get(auth, getUnsold)
    .post(converter, postUnSold)

module.exports=router;