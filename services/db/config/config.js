const fs = require('fs');

module.exports = {
  development: {
    username: process.env.SAT_SRV_DB_USERNAME || 'postgres',
    password: process.env.SAT_SRV_DB_PASSWORD || 'Cisco1234!',
    database: process.env.SAT_SRV_DB_NAME || 'sat_srv_dev',
    host: process.env.SAT_SRV_DB_HOSTNAME || 'localhost',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.SAT_SRV_DB_USERNAME || 'postgres',
    password: process.env.SAT_SRV_DB_PASSWORD || 'Cisco1234!',
    database: process.env.SAT_SRV_DB_NAME || 'sat_srv_test',
    host: process.env.SAT_SRV_DB_HOSTNAME || 'localhost',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.SAT_SRV_DB_USERNAME || 'postgres',
    password: process.env.SAT_SRV_DB_PASSWORD || 'Cisco1234!',
    database: process.env.SAT_SRV_DB_NAME || 'sat_srv',
    host: process.env.SAT_SRV_DB_HOSTNAME || 'localhost',
    dialect: 'postgres',
    logging: false
  }
};