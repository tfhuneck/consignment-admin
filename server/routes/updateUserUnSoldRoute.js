const express       = require('express');
const router        = express.Router();
const update        = require('../controllers/updateUserUnSold')

router.route('/')
    .get(update)

module.exports = router;