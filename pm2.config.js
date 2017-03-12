'use strict';

const _ = require('lodash');

const defaultConfig = {
  apps: {
    api: {
      name: 'api',
      env: {
        NODE_ENV: process.env.ENV,
        PORT: 8080,
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      script: './src/index.js',
    },
  },
};

const configByEnv = {
  development: {
    apps: {
      api: {
        autorestart: false,
        exec_interpreter: 'babel-node',
        // max_restarts: 2,
        // watch: [
        //   'node_modules',
        //   'src',
        // ],
      },
    },
  },
  production: {
    apps: {
      api: {
        exec_mode: 'cluster',
        instances: 0,
        script: './dist/index.js',
      },
    },
  },
};

const config = _.defaultsDeep(configByEnv[process.env.ENV], defaultConfig);

module.exports = {
  apps: [
    config.apps.api,
  ],
};
