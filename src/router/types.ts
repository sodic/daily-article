import { RequestHandler } from 'express';

export const enum HttpMethod {
    Get = 'GET',
    Head = 'HEAD',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
    Connect = 'CONNECT',
    Options= 'OPTIONS',
    Trace = 'TRACE',
    Patch = 'PATCH',

}
export type PathConfig = Record<string, RequestHandler>
export type ApiConfig = Record<HttpMethod, PathConfig>;