const express               = require('express');
const router                = express.Router();
const ActiveNew             = require('../controllers/updateDataActive')

router.route('/')
    .get(ActiveNew)

module.exports = router;