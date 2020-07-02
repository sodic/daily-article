import { Request, Response } from 'express';
import { getStorage } from 'storage/getStorage';
import OperationStatus from 'api/types/OperationStatus';
import getArticleService from 'service/storageService';
import Message from './types/Message';

const responseFor: Record<OperationStatus, (r: Response) => void> = {
	[OperationStatus.NoChanges]: res => sendResponse(res, Message.NoChanges, 200),
	[OperationStatus.InvalidArticleName]: res => sendErrorResponse(res, Message.MissingArticleName),
	[OperationStatus.UnexpectedError]: res => sendErrorResponse(res, Message.UnexpectedError, 500),
	[OperationStatus.Success]: res => sendResponse(res, Message.Success, 200),
};

const articleService = getArticleService(getStorage());

function sendErrorResponse(res: Response, message: string, status :400 | 500 = 400) {
	sendResponse(res, message, status);
}

function sendResponse(res: Response, message: string, status: number) {
	res.status(status).send(message);
}

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
	const name = req.params.articleName;
	if (!name) {
		sendErrorResponse(res, Message.MissingArticleName);
		return;
	}

	const status = await articleService.markArticleAsRead(name);
	responseFor[status](res);
}

export async function deleteRead(req: Request, res: Response): Promise<void> {
	const name = req.params.articleName;
	if (!name) {
		sendErrorResponse(res, Message.MissingArticleName);
		return;
	}

	const status = await articleService.markArticleAsUnread(name);
	responseFor[status](res);
}