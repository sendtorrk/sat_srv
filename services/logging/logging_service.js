//
// Author: Raja Kannan
//

'use strict';

// Public modules
const winston = require('winston');
const { format } = require('logform');
const { combine, timestamp, printf } = format;
const momenttz = require('moment-timezone');

class LoggingService {
  constructor() {
    let logLevel = process.env.SAT_SRV_LOG_LEVEL;
    if (!logLevel) {
      logLevel = 'debug';
    }

    const myFormat = printf(info => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    });

    const appendTimestamp = format((info, opts) => {
      if (opts.tz) {
        info.timestamp = momenttz().tz(opts.tz).format('MM-DD-YYYY h:mm:ss a Z z');
      }

      return info;
    });

    winston.configure({
      transports: [
        new winston.transports.Console({
          format: combine(
            appendTimestamp({ tz: 'America/Chicago' }),
            myFormat
          ),
          level: logLevel,
          json: false,
          'colorize': true,
          'timestamp': true,
          handleExceptions: true,
          humanReadableUnhandledException: true
        })
      ]
    });

    winston.exitOnError = false;
  }

  error(msg, properties) {
    winston.log('error', msg, properties);
  }

  warning(msg, properties) {
    winston.log('warn', msg, properties);
  }

  info(msg, properties) {
    winston.log('info', msg, properties);
  }

  debug(msg, properties) {
    winston.log('debug', msg, properties);
  }

  silly(msg, properties) {
    winston.log('silly', msg, properties);
  }
}

module.exports = new LoggingService();