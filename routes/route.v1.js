const users = require('./users');
const location = require('./location');
const promo = require('./promo');

module.exports = (app) => {
  app.use('/v1/users', users);
  app.use('/v1/location', location);
  app.use('/v1/promo', promo);

  return app;
}
