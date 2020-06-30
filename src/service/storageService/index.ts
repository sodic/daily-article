import IService from 'api/types/IService';
import Article from 'api/types/Article';
import OperationStatus from 'api/types/OperationStatus';
import IStorage from 'service/types/IStorage';
import StorageStatus from 'service/types/StorageStatus';

const operationStatusFor: Record<StorageStatus, OperationStatus> = {
	[StorageStatus.NoChanges]: OperationStatus.NoChanges,
	[StorageStatus.Success]: OperationStatus.Success,
};

export default function createArticleService(storage: IStorage): IService {
	return {
		getArticleByName(name: string): Article | null {
			return storage.getArticleByName(name);
		},

		getRandomArticle(): Article {
			const articles = storage.getAllArticles();
			return articles[Math.floor(Math.random() * articles.length)];
		},

		markArticleAsRead(name: string): OperationStatus {
			const article = storage.getArticleByName(name);
			if (!article) {
				return OperationStatus.InvalidArticleName;
			}

			try {
				const storageStatus = storage.setArticleRead(article);
				return operationStatusFor[storageStatus];
			} catch (e) {
				return OperationStatus.UnexpectedError;
			}
		},

		markArticleAsUnread(name: string): OperationStatus {
			const article = storage.getArticleByName(name);
			if (!article) {
				return OperationStatus.InvalidArticleName;
			}

			try {
				const storageStatus = storage.setArticleUnread(article);
				return operationStatusFor[storageStatus];
			} catch (e) {
				return OperationStatus.UnexpectedError;
			}
		},

	};
}