import { RequestHandler } from 'express';

export const enum HttpMethod {
	Get = 'GET',
	Head = 'HEAD',
	Post = 'POST',
	Put = 'PUT',
	Delete = 'DELETE',
	Connect = 'CONNECT',
	Options = 'OPTIONS',
	Trace = 'TRACE',
	Patch = 'PATCH',

}

export interface Api {
	getArticleByName: RequestHandler,
	getRandomArticle: RequestHandler,
	addRead: RequestHandler,
	deleteRead: RequestHandler,
}

export type PathConfig = Record<string, RequestHandler>

export type RouteDefinition = Record<HttpMethod, PathConfig>;