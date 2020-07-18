import {
	Api,
	HttpMethod,
	RouteDefinition,
} from './types';

export default function defineRoutes(api: Api): RouteDefinition {
	return {
		[HttpMethod.Get]: {
			'/:articleName': api.getArticleByName,
			'/': api.getRandomArticle,
		},
		[HttpMethod.Post]: {
			'/:articleName': api.addRead,
		},
		[HttpMethod.Delete]: {
			'/:articleName': api.deleteRead,
		},
		[HttpMethod.Head]: {},
		[HttpMethod.Put]: {},
		[HttpMethod.Connect]: {},
		[HttpMethod.Options]: {},
		[HttpMethod.Trace]: {},
		[HttpMethod.Patch]: {},
	};
}