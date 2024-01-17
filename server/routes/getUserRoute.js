const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const GetUser               = require('../controllers/getUser');

router.route('/')
    .get(auth, GetUser)

module.exports = router;

