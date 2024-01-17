const express               = require('express');
const router                = express.Router();
const getImages             = require('../controllers/updateImagesUnsold');

router.route('/')
    .get(getImages)


module.exports = router;