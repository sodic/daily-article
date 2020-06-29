import { ApiConfig, HttpMethod } from './types';
import * as Controller from '../controller';

export default {
	[HttpMethod.Get]: {
		'/random': Controller.getRandomArticle,
		'/': Controller.getArticleByName,
	},
	[HttpMethod.Head]: {
	},
	[HttpMethod.Post]: {
		'/post': Controller.addArticle,
	},
	[HttpMethod.Put]: {
	},
	[HttpMethod.Delete]: {
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
