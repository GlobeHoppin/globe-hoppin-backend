const auth = require('./auth');
const pin = require('./pin');
const user = require('./user');
const notification = require('./notification');
module.exports = {
  ...auth,
  ...pin,
  ...user,
  ...notification,
};