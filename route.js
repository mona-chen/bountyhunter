const express = require('express');
const {discoverScammers, reportScammers, getScammers} = require('./controller');
const router = express.Router();

router.post('/discover', discoverScammers)
router.post('/report', reportScammers)
router.get('/all', getScammers)



module.exports = router;