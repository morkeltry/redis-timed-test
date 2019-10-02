const express = require('express');
const path = require('path');
const router = express.Router();

const api = require('./api');

router.get('/api/', api.get);
router.get('/api/:params', api.get);


module.exports = router;
