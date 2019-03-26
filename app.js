//
// Author: Raja Kannan
//

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const util = require('util');
const http = require('http');
const https = require('https');
const fs = require('fs');

const loggingService = require('./services/logging/logging_service');
const dbService = require('./services/db/db_service');

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

// Server
const app = express();
const port = 8444;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/v1', require('./routes/v1/entry_routes'));
app.use('/api/v1', require('./routes/v1/teams_routes'));
app.use('/api/v1', require('./routes/v1/assets_routes'));
app.use('/api/v1', require('./routes/v1/assetnotes_routes'));

// NOTE: Error handler should always be the last middleware. DO NOT add any
// routes after error handler.
app.use((err, req, res, next) => {
  if (err.stack) {
    loggingService.error(err.stack);
  }

  loggingService.error(http.STATUS_CODES[500] + ': ' + err);
  return res.status(500).json(err);
});

const appServer = https.createServer({
  key: fs.readFileSync('crt/SatKey.key', 'utf8'),
  cert: fs.readFileSync('crt/SatCert.crt', 'utf8'),
}, app);

// Start
async function start() {
  try {
    loggingService.info('Starting server ...');

    await dbService.synchronizeDb();
    await appServer.listen(port);

    loggingService.info(`Server started and listening on port ${port}`);
  }
  catch (error) {
    loggingService.error('Unable to start server. Reason: ' + error);
  }
}

start();