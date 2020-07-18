import { Router } from 'express';
import {
	Api,
	HttpMethod,
	RouteDefinition,
} from './types';
import defineRoutes from './routes';

function registerRoutes(router: Router, routeDefinition: RouteDefinition): Router {
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

	Object.entries(routeDefinition).forEach(([ method, pathDefinitions]) => {
		Object.entries(pathDefinitions).forEach(([ path, handler ]) => {
			const register = methodMap[method as HttpMethod];
			register(path, handler);
		});
	});

	return router;
}

function router(apiImplementation: Api): Router {
	const router = Router();
	const routeDefinitions = defineRoutes(apiImplementation);

	return registerRoutes(router, routeDefinitions);
}

export default router;
