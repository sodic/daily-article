import { Router } from 'express';
import { HttpMethod } from './types';
import serverConfig from './apiConfig';

function createRouter() {
	const router = Router();

	const methodMap = {
		[HttpMethod.Get]: router.get.bind(router),
		[HttpMethod.Head]: router.head.bind(router),
		[HttpMethod.Post]: router.post.bind(router),
		[HttpMethod.Put]: router.put.bind(router),
		[HttpMethod.Delete]: router.delete.bind(router),
		[HttpMethod.Connect]: router.connect.bind(router),
		[HttpMethod.Options]: router.options.bind(router),
		[HttpMethod.Trace]: router.trace.bind(router),
		[HttpMethod.Patch]: router.patch.bind(router),
	};

	Object.entries(serverConfig).forEach(([ method, pathConfig]) => {
		Object.entries(pathConfig).forEach(([ path, controller ]) => {
			const register = methodMap[method as HttpMethod];
			register(path, controller);
		});
	});

	return router;
}

export default createRouter();
