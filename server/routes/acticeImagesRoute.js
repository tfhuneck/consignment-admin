const express               = require('express');
const router                = express.Router();
const getImages             = require('../controllers/updateImagesActive');

router.route('/')
    .get(getImages)


module.exports = router;