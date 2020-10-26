const postRoutes = require('./post_routes');

module.exports = (app, db) => {
  postRoutes(app, db);
}