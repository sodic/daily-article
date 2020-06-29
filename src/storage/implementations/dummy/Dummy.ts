import { IStorage } from '../../IStorage';
import { Article } from '../../Article';
import articles from './articles';

export function createDummyStorage() : IStorage {
	return {
		getRandomArticle(): Article {
			return articles[Math.floor(Math.random() * articles.length)];
		},
		getArticleByName(name: string): Article | null {
			return articles.find(article => article.term === name) || null;
		},
	};
}

