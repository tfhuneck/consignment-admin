const express               = require('express');
const router                = express.Router();
const postCanceled          = require('../controllers/postCanceledListings')
const updateCancel          = require('../controllers/updateDataCanceled')

router.route('/')
    .post(postCanceled)
    .get(updateCancel)

module.exports = router;