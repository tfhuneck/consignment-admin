const express               = require('express');
const router                = express.Router();
const auth                  = require('../middleware/auth');
const GetUsers              = require('../controllers/getUsers');

router.route('/')
    .get(auth, GetUsers)
    .put(GetUsers)

module.exports = router;

