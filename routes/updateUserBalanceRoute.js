const express       = require('express');
const router        = express.Router();
const update        = require('../controllers/updateUserBalance')

router.route('/')
    .get(update)

module.exports = router;