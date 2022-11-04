const users = require('./users');
const location = require('./location');

module.exports = (app) => {
  app.use('/v1/users', users);
  app.use('/v1/location', location);

  return app;
}
