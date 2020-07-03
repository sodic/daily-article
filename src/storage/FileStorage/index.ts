import Storage from 'service/types/Storage';
import ArticleModel from 'service/types/ArticleModel';
import StorageStatus from 'service/types/StorageStatus';
import {
	readArraySync,
	readSetSync,
	writeSet,
} from './serialization';

type ArticleRecord = Record<string, ArticleModel>;

export default class FileStorage implements Storage {
	private readonly articleMap: ArticleRecord;
	private readonly readArticles: Set<string>;
	private readonly readArticlesFile: string;

	constructor(allArticlesFile: string, readArticlesFile: string) {
		const articles = readArraySync<ArticleModel>(allArticlesFile);
		this.articleMap = articles.reduce(
			(record: ArticleRecord, article: ArticleModel) => ({  ...record, [article.term]: article }),
			{},
		);

		this.readArticles = readSetSync(readArticlesFile);
		this.readArticlesFile = readArticlesFile;
	}

	getAllArticles(): ArticleModel[] {
		return Object.values(this.articleMap);
	}

	getArticleByName(name: string): ArticleModel | null {
		return this.articleMap[name] || null;
	}

	setArticleRead(article: ArticleModel): Promise<StorageStatus> {
		return this.updateReadArticles(
			() => this.readArticles.has(article.term),
			() => this.readArticles.add(article.term),
			() => this.readArticles.delete(article.term),
		);
	}

	setArticleUnread(article: ArticleModel): Promise<StorageStatus> {
		return this.updateReadArticles(
			() => !this.readArticles.has(article.term),
			() => this.readArticles.delete(article.term),
			() => this.readArticles.add(article.term),
		);
	}

	private async updateReadArticles(isApplicable: () => boolean, update: () => void, rollback: () => void) {
		if (isApplicable()) {
			return StorageStatus.NoChanges;
		}

		update();
		const status = await this.persistReadArticles();
		if (status !== StorageStatus.Success) {
			// ensure valid state
			rollback();
		}
		return status;
	}

	private async persistReadArticles() {
		try {
			await writeSet(this.readArticlesFile, this.readArticles);
			return StorageStatus.Success;
		} catch(e) {
			return StorageStatus.UnkownError;
		}
	}
}