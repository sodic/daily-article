import articles from './articles';
import Storage from 'service/types/Storage';
import ArticleDto from 'api/types/ArticleDto';
import StorageStatus from 'service/types/StorageStatus';

export default class Dummy implements Storage {

	private readonly allArticles: ArticleDto[];
	private readonly readTerms: Set<string>;

	constructor() {
		this.allArticles = articles;
		this.readTerms = new Set();
	}

	public setArticleUnread(article: ArticleDto): StorageStatus {
		if (!this.readTerms.has(article.term)) {
			return StorageStatus.NoChanges;
		}

		this.readTerms.delete(article.term);
		return StorageStatus.Success;
	}

	public setArticleRead(article: ArticleDto): StorageStatus {
		if (this.readTerms.has(article.term)) {
			return StorageStatus.NoChanges;
		}

		this.readTerms.add(article.term);
		return StorageStatus.Success;
	}

	public getAllArticles(): ArticleDto[] {
		return this.allArticles;
	}

	public getArticleByName(term: string): ArticleDto | null {
		return this.allArticles.find(article => article.term === term) || null;
	}
}

