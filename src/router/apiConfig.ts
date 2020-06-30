import { ApiConfig, HttpMethod } from './types';
import * as Api from 'api';

export default {
	[HttpMethod.Get]: {
		'/:articleName': Api.getArticleByName,
		'/': Api.getRandomArticle,
	},
	[HttpMethod.Head]: {
	},
	[HttpMethod.Post]: {
		'/:articleName': Api.addRead,
	},
	[HttpMethod.Put]: {
	},
	[HttpMethod.Delete]: {
		'/:articleName': Api.deleteRead,
	},
	[HttpMethod.Connect]: {
	},
	[HttpMethod.Options]: {
	},
	[HttpMethod.Trace]: {
	},
	[HttpMethod.Patch]: {
	},
} as ApiConfig;
