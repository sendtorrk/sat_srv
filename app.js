//
// Author: Raja Kannan
//

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const util = require('util');

const loggingService = require('./services/logging/logging_service');
const dbService = require('./services/db/db_service');

const app = express();
const port = 8081;

// Stop
async function stop() {
  // Any resource clean-up goes here
}

// Signal handlers
process.on('SIGTERM', () => {
  loggingService.info('SIGTERM received');

  stop();

  process.exit(0);
});

process.on('SIGINT', () => {
  loggingService.info('SIGINT received');

  stop();

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

// Start
async function start() {
  try {
    loggingService.info('Starting server ...');

    await dbService.synchronizeDb();
    await app.listen(port);

    loggingService.info(`Server started and listening on port ${port}`);
  }
  catch (error) {
    loggingService.error('Unable to start server. Reason: ' + error);
  }
}

start();