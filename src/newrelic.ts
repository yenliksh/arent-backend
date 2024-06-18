'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

exports.config = {
  app_name: [process.env.NEWRELIC_APP_NAME],
  license_key: process.env.NEWRELIC_LICENSE_KEY,
  logging: {
    level: 'info',
  },
  allow_all_headers: true,
  application_logging: {
    forwarding: {
      enabled: true,
    },
  },
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*',
    ],
  },
  transaction_tracer: {
    record_sql: 'raw',
  },
};
