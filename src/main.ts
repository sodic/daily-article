import { createServer }  from 'http';
import express from 'express';
import router from 'router';
import config from 'config';

function createApp() {
	const app = express();
	app.use('/article', router);
	return app;
}

const app = createApp();

const httpServer = createServer(app);
httpServer.listen(config.port);
