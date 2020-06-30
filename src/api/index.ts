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

export function getRandomArticle(req: Request, res: Response): void {
	const article = articleService.getRandomArticle();
	res.json(article);
	// res.redirect(url);
}

function sendResponse(res: Response, message: string, status: number) {
	res.status(status).send(message);
}

function sendErrorResponse(res: Response, message: string, status :400 | 500 = 400) {
	sendResponse(res, message, status);
}

export function getArticleByName(req: Request, res: Response): void {
	const name = req.params.articleName;
	if (!name) {
		sendErrorResponse(res, Message.MissingArticleName);
		return;
	}

	const article = articleService.getArticleByName(name as string);
	if (!article) {
		sendErrorResponse(res, Message.InvalidArticleName);
		return;
	}

	res.json(article);
	// res.redirect(article.url);
}

export function addRead(req: Request, res: Response): void {
	const name = req.params.articleName;
	if (!name) {
		sendErrorResponse(res, Message.MissingArticleName);
		return;
	}

	const status = articleService.markArticleAsRead(name);
	responseFor[status](res);
}

export function deleteRead(req: Request, res: Response): void {
	const name = req.params.articleName;
	if (!name) {
		sendErrorResponse(res, Message.MissingArticleName);
		return;
	}

	const status = articleService.markArticleAsUnread(name);
	responseFor[status](res);
}