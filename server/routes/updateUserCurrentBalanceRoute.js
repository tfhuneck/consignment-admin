const express       = require('express');
const router        = express.Router();
const update        = require('../controllers/updateUserCurrentBalance')

router.route('/')
    .get(update)

module.exports = router;