const express               = require('express');
const router                = express.Router();
const updateUser            = require('../controllers/updateUser')

router.route('/')
    .get(updateUser);

module.exports = router;