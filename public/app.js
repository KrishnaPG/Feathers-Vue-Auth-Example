// Establish a Socket.io connection
const socket = io();

// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const client = feathers();
client.configure(feathers.socketio(socket));

// Use localStorage to store our login token
client.configure(feathers.authentication());

const login = async () => {
	try {
		// First try to log in with an existing JWT
		return await client.reAuthenticate();
	} catch (error) {
		// If that errors, log in with email/password
		// Here we would normally show a login page
		// to get the login information
		// return await client.authenticate({
		// 	strategy: 'local',
		// 	email: 'admin@local',
		// 	password: 'default'
		// });
	}
};

const main = async () => {
	const auth = await login();

	console.log('User is authenticated', auth);

	// Log us out again
	await client.logout();
};

main();

const routes = /(confirmation|invite|recovery|email_change)_token=([^&]+)/;
const errorRoute = /error=access_denied&error_description=403/;
const accessTokenRoute = /access_token=/;

function runRoutes() {
	const hash = (document.location.hash || "").replace(/^#\/?/, "");
	if (!hash) {
		return;
	}

	const m = hash.match(routes);
	if (m) {
		store.verifyToken(m[1], m[2]);
		document.location.hash = "";
	}

	const em = hash.match(errorRoute);
	if (em) {
		store.openModal("signup");
		document.location.hash = "";
	}

	const am = hash.match(accessTokenRoute);
	if (am) {
		const params = {};
		hash.split("&").forEach(pair => {
			const [key, value] = pair.split("=");
			params[key] = value;
		});
		if (!!document && params["access_token"]) {
			//document.cookie = `nf_jwt=${params["access_token"]}`;
			console.log(`nf_jwt=${params["access_token"]}`);
		}
		if (params["state"]) {
			try {
				// skip initialization for implicit auth
				const state = decodeURIComponent(params["state"]);
				const { auth_type } = JSON.parse(state);
				if (auth_type === "implicit") {
					return;
				}
				// eslint-disable-next-line no-empty
			} catch (e) { }
		}
	}
}

//runRoutes();