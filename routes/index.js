const users = require('./users');
const location = require('./location');

module.exports = (app) => {
  app.use('/users', users);
  app.use('/location', location);

  return app;
}
