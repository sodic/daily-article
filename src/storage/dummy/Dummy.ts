import articles from './articles';
import IStorage from 'service/types/IStorage';
import Article from 'api/types/Article';
import StorageStatus from 'service/types/StorageStatus';

export default class Dummy implements IStorage{

	private readonly allArticles: Article[];
	private readTerms: Set<string>;

	constructor() {
		this.allArticles = articles;
		this.readTerms = new Set();
	}

	public setArticleUnread(article: Article): StorageStatus {
		if (!this.readTerms.has(article.term)) {
			return StorageStatus.NoChanges;
		}

		this.readTerms.delete(article.term);
		return StorageStatus.Success;
	}

	public setArticleRead(article: Article): StorageStatus {
		if (this.readTerms.has(article.term)) {
			return StorageStatus.NoChanges;
		}

		this.readTerms.add(article.term);
		return StorageStatus.Success;
	}

	public getAllArticles(): Article[] {
		return this.allArticles;
	}

	public getArticleByName(term: string): Article | null {
		return this.allArticles.find(article => article.term === term) || null;
	}
}

