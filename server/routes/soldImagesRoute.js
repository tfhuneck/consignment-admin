const express               = require('express');
const router                = express.Router();
const getImages             = require('../controllers/updateImagesSold');

router.route('/')
    .get(getImages)


module.exports = router;