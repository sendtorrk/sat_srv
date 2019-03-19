//
// Author: Raja Kannan
//

'use strict';

const models = require('./models');

const loggingService = require('../logging/logging');

class DbService {
  constructor() {
  }

  async synchronizeDb() {
    loggingService.info('Syncing database...');

    await models.sequelize.sync({
      force: false,
      logging: false
    });

    loggingService.info('Database synced');
  }
}

module.exports = new DbService();