import { Request, Response } from 'express';
import { getStorage } from 'storage/getStorage';


const storage = getStorage();

export function getRandomArticle(req: Request, res: Response): void {
	const { url } = storage.getRandomArticle();
	res.redirect(url);
}

export function getArticleByName(req: Request, res: Response): void {
	const name = req.query.name;
	if (!name) {
		res.status(400).send('Specify a name');
		return;
	}

	const article = storage.getArticleByName(name as string);
	if (!article) {
		res.status(400).send('No article with the name specified');
		return;
	}

	res.redirect(article.url);
}

export function addArticle(req: Request, res: Response): void {
	res.json({ response: 'stvorio si, okej' });
}