import { promises as promiseFs } from 'fs';
import fs from 'fs';
import Storage from 'service/types/Storage';
import Article from 'api/types/Article';
import StorageStatus from 'service/types/StorageStatus';
import { readArray, readSet, serializeSet } from './serialization';

type ArticleRecord = Record<string, Article>;

export default class FileStorage implements Storage {
	private readonly articleMap: ArticleRecord;
	private readonly readArticles: Set<string>;
	private readonly readArticlesFile: string;

	constructor(allArticlesFile: string, readArticlesFile: string) {
		console.log(fs.readdirSync('.'));
		const articles = readArray<Article>('./' + allArticlesFile);
		this.articleMap = articles.reduce(
			(record: ArticleRecord, article: Article) => ({  ...record, [article.term]: article }),
			{},
		);

		this.readArticles = readSet('./' + readArticlesFile) ;
		this.readArticlesFile = readArticlesFile;
	}

	getAllArticles(): Article[] {
		return Object.values(this.articleMap);
	}

	getArticleByName(name: string): Article | null {
		return this.articleMap[name] || null;
	}

	setArticleRead(article: Article): Awaitable<StorageStatus> {
		if (this.readArticles.has(article.term)) {
			return StorageStatus.NoChanges;
		}

		return this.updateArticleReadStatus(
			() => this.readArticles.add(article.term),
			() => this.readArticles.delete(article.term),
		);
	}

	setArticleUnread(article: Article): Awaitable<StorageStatus> {
		if (!this.readArticles.has(article.term)) {
			return StorageStatus.NoChanges;
		}

		return this.updateArticleReadStatus(
			() => this.readArticles.delete(article.term),
			() => this.readArticles.add(article.term),
		);
	}

	private async updateArticleReadStatus(update: () => void, rollback: () => void) {
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
			await promiseFs.writeFile(this.readArticlesFile, serializeSet(this.readArticles));
			return StorageStatus.Success;
		} catch(e) {
			return StorageStatus.UnkownError;
		}
	}
}