const express               = require('express');
const router                = express.Router();
const GetUsers              = require('../controllers/getUsers');

router.route('/')
    .get(GetUsers)

module.exports = router;

