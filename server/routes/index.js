const express = require('express');
const path = require('path');
const router = express.Router();

const api = require('./api');

router.get('/:endpoint/recent/', api.recent);
router.get('/:endpoint/recent/:count', api.recent);
router.get('/:endpoint/range/:start/:end', api.range);
router.get('/:endpoint/since/:start', api.since);


module.exports = router;
