const express = require('express');
const router = express.Router();
const updateAnalysis = require('../controllers/updateAnalysis');
const getAnalysis = require('../controllers/getAnalysis')

router.route('/')
    
    .post(updateAnalysis)
    .get(getAnalysis)

module.exports = router;