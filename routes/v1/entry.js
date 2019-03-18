//
// Author: Raja Kannan
//

'use strict';

const express = require('express');
const util = require('util');
const os = require('os');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Running!!!');
});

module.exports = router;
