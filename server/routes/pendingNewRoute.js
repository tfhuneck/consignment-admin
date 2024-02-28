const express               = require('express');
const router                = express.Router();
const PendingNew            = require('../controllers/updateDataPending')

router.route('/')
    .get(PendingNew)

module.exports = router;