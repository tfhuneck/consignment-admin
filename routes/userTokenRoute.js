const express       = require('express');
const router        = express.Router();
const saveToken     = require('../controllers/saveUserToken');
const fetchToken    = require('../controllers/fetchUserToken')

router.route('/')
    .get(fetchToken)
    .post(saveToken)

module.exports = router;
