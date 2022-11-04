const users = require('./users');
const location = require('./location');
const promo = require('./promo');
const clinic = require('./clinic');
const blog = require('./blog');

module.exports = (app) => {
  app.use('/v1/users', users);
  app.use('/v1/location', location);
  app.use('/v1/promo', promo);
  app.use('/v1/clinic', clinic);
  app.use('/v1/blog', blog);

  return app;
}
