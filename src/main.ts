import * as http from 'http';
import config from 'config';
import express from 'express';
import router from 'router';

function buildExpressApp() {
	const app = express();
	app.use('/article', router);
	return app;
}

const app = buildExpressApp();

const httpServer = http.createServer(app);
httpServer.listen(config.port);
