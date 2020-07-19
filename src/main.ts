import { createServer }  from 'http';
import express from 'express';
import router from 'router';
import config from 'config';
import FileStorage from 'storage/FileStorage';
import storageService from 'service/storageService';
import articleApi from 'api/articleApi';

function createApp() {
	const storage = new FileStorage('resources/articles.json', 'resources/read.json');
	const service = storageService(storage);
	const api = articleApi(service);
	const routerImplementation = router(api);

	const app = express();
	app.disable('x-powered-by');
	app.disable('etag');
	app.use('/', routerImplementation);

	return app;
}

const app = createApp();
const httpServer = createServer(app);
httpServer.listen(config.port);
