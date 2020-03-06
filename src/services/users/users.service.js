// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
	const options = {
		Model: createModel(app),
		paginate: app.get('paginate')
	};

	// Initialize our service with any options it requires
	app.use('/users', new Users(options, app));

	// Get our initialized service so that we can register hooks
	const service = app.service('users');

	service.hooks(hooks);

	// create the built-in admin user.
	// on every run we update the record. It helps if password is changed in the config or hash method is changed.
	const authConfig = app.settings.authentication;
	const usernameField = authConfig.local.usernameField;
	const adminConfig = authConfig.admin || {};
	const query = { "$limit": 1 };
	query[usernameField] = adminConfig[usernameField];
	const params = {
		query,
		authenticated: true,    // ignore auth hooks
	};
	service.find(params).then(async result => {
		return result.data.length > 0 ? service.update(result.data[0]._id, adminConfig, {}) : service.create(adminConfig);
	});  
};
