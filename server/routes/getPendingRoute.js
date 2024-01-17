const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const GetPending            = require('../controllers/getPending');

router.route('/')
    .get(auth, GetPending)

module.exports = router;
