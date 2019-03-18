//
// Author: Raja Kannan
//

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const util = require('util');

const loggingService = require('./services/logging/logging');

const app = express();
const port = 8081;

// Signal handlers
process.on('SIGTERM', () => {
  loggingService.info('SIGTERM received');
  process.exit(0);
});

process.on('SIGINT', () => {
  loggingService.info('SIGINT received');
  process.exit(0);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/v1', require('./routes/v1/entry'));

// NOTE: Error handler should always be the last middleware. DO NOT add any
// routes after error handler.
app.use((err, req, res, next) => {
  // Errors MUST be handled by higher level code. This last chance error
  // handler insures the client gets a response to the request. But if an
  // error propagates all the way to this handler it is considered an internal
  // server error (status code 500).
  if (err.stack) {
    loggingService.error(err.stack);
  }

  loggingService.error(err);
  return res.status(500).json(err);
});

app.listen(port, () => {
  loggingService.info(`Server started and listening on port ${port}`);
});
