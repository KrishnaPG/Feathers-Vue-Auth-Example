const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
	app.configure(users);
};

module.exports.enableRestrictions = function (_app) {
	// setup hooks to restrict internal services
};