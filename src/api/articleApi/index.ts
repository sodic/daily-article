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

async function updateAndRespond(req: Request, res: Response, update: (name: string) => Awaitable<OperationStatus>) {
	const name = req.params.articleName;
	if (!name) {
		sendErrorResponse(res, Message.MissingArticleName);
		return;
	}

	const status = await update(name);
	sendAppropriateResponse(res, status);
}

export default function articleApi(articleService: Service): Api {
	return {
		async getRandomArticle(req: Request, res: Response): Promise<void> {
			const article = await articleService.getRandomArticle();
			res.json(article);
			// res.redirect(url);
		},

		async getArticleByName(req: Request, res: Response): Promise<void> {
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
		},

		async addRead(req: Request, res: Response): Promise<void> {
			return updateAndRespond(req, res, name => articleService.markArticleAsRead(name));
		},

		async deleteRead(req: Request, res: Response): Promise<void> {
			return updateAndRespond(req, res, name => articleService.markArticleAsUnread(name));
		},
	};
}