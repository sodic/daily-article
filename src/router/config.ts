import { RouterConfig, HttpMethod } from './types';
import * as Api from 'api';

export default {
	[HttpMethod.Get]: {
		'/:articleName': Api.getArticleByName,
		'/': Api.getRandomArticle,
	},
	[HttpMethod.Post]: {
		'/:articleName': Api.addRead,
	},
	[HttpMethod.Delete]: {
		'/:articleName': Api.deleteRead,
	},
	[HttpMethod.Head]: {},
	[HttpMethod.Put]: {},
	[HttpMethod.Connect]: {},
	[HttpMethod.Options]: {},
	[HttpMethod.Trace]: {},
	[HttpMethod.Patch]: {},
} as RouterConfig;
