import {
	Request,
	Response,
} from 'express';
import { getStorage } from 'storage/getStorage';
import getArticleService from 'service/storageService';
import OperationStatus from './types/OperationStatus';
import Message from './types/Message';
import {
	sendErrorResponse,
	sendAppropriateResponse,
} from './responseUtil';

const articleService = getArticleService(getStorage());

export async function getRandomArticle(req: Request, res: Response): Promise<void> {
	const article = await articleService.getRandomArticle();
	res.json(article);
	// res.redirect(url);
}

export async function getArticleByName(req: Request, res: Response): Promise<void> {
	const name = req.params.articleName;
	if (!name) {
		sendErrorResponse(res, Message.MissingArticleName);
		return;
	}

	const article = await articleService.getArticleByName(name as string);
	if (!article) {
		sendErrorResponse(res, Message.InvalidArticleName);
		return;
	}

	res.json(article);
	// res.redirect(article.url);
}

export async function addRead(req: Request, res: Response): Promise<void> {
	return updateAndRespond(req, res, name => articleService.markArticleAsRead(name));
}

export async function deleteRead(req: Request, res: Response): Promise<void> {
	return updateAndRespond(req, res, name => articleService.markArticleAsUnread(name));
}

async function updateAndRespond(req: Request, res: Response, update: (name: string) => Awaitable<OperationStatus>) {
	const name = req.params.articleName;
	if (!name) {
		sendErrorResponse(res, Message.MissingArticleName);
		return;
	}

	const status = await update(name);
	sendAppropriateResponse(res, status);
}