const express               = require('express');
const router                = express.Router();
const converter             = require('../middleware/convertUnsoldData');
const postUnSold            = require('../controllers/postUnsoldPost');
const getUnsold             = require('../controllers/getUnsold');

router.route('/')
    .get(getUnsold)
    .post(converter, postUnSold)

module.exports=router;