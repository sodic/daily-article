import {
	Request,
	Response,
} from 'express';
import { Api } from 'router/types';
import OperationStatus from 'api/types/OperationStatus';
import Service from 'api/types/Service';
import Message from 'api/types/Message';
import {
	sendErrorResponse,
	sendAppropriateResponse,
} from './responseUtil';

export default function articleApi(articleService: Service): Api {
	async function getRandomArticle(req: Request, res: Response) {
		const article = await articleService.getRandomArticle();
		res.json(article);
		// res.redirect(url);
	}

	async function getArticleByName(req: Request, res: Response) {
		const name = req.params.articleName;
		if (!name) {
			sendErrorResponse(res, Message.MissingArticleName);
			return;
		}

		const article = await articleService.getArticleByName(name);
		if (!article) {
			sendErrorResponse(res, Message.InvalidArticleName);
			return;
		}

		res.json(article);
		// res.redirect(article.url);
	}

	function addRead(req: Request, res: Response) {
		return updateAndRespond(req, res, name => articleService.markArticleAsRead(name));
	}

	function deleteRead(req: Request, res: Response) {
		return updateAndRespond(req, res, name => articleService.markArticleAsUnread(name));
	}

	return {
		getRandomArticle,
		getArticleByName,
		addRead,
		deleteRead,
	};
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
