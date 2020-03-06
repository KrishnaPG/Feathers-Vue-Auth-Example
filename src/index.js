/**
 * Copyright © 2020 Cenacle Research India Private Limited.
 * All Rights Reserved.
 */



const app = require('./app');
const host = app.get('host');
const port = app.get('port');
const server = app.listen(port, host);

process.on('unhandledRejection', (reason, _p) =>
	app.logger.error(`Unhandled Rejection ${reason.stack}`)
);

server.on('listening', () =>
	app.logger.info(`Server started at ${host}:${port}`)
);

app.atExit(() => {
	// shutdown the Feathers WebServices
	if (server) server.close();
	// Cleanup service resources
	Object.keys(app.services).forEach(path => {
		const service = app.service(path);
		if (typeof service.cleanup === 'function') {
			service.cleanup();
		}
	});
});