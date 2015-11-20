var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'acsbackend'
    },
    port: 3000,
    db: 'mysql://root@localhost/acsbackend_development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'acsbackend'
    },
    port: 3000,
    db: 'mysql://root@localhost/acsbackend_test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'acsbackend'
    },
    port: 3000,
    db: 'mysql://root@localhost/acsbackend_production'
  }
};

module.exports = config[env];
