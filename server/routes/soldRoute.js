const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const converter             = require('../middleware/convertSoldData');
const postSold              = require('../controllers/postSold');
const getSold               = require('../controllers/getSold');

router.route('/')
    .get(auth, getSold)
    .post(converter, postSold)

module.exports=router;