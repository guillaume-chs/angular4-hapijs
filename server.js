'use strict';

const hapi = require('hapi');

const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 3000,
  router: {
    stripTrailingSlash: true
  }
});

server.register({
  register: require('./angular-4-quickstart')
});
/*server.register({
  register: require('./back-end'),
  routes: { prefix: '/api' }
});*/

server.register({
  register: require('good'),
  options: {
    ops: { interval: 600000 },
    reporters: {
      console: [
        { module: 'good-console'}, 'stdout'
      ]
    }
  }},
  (err) => {
    if (err) throw err;
});

if (!process.env.PRODUCTION) {
  server.register({
    register: require('blipp'),
    options: { showAuth: true }
    },
    (err) => {
      if (err) throw err;
  });
}

server.start((err) => {
  if (err) throw err;
  console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
});
