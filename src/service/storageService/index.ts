import Service from 'api/types/Service';
import OperationStatus from 'api/types/OperationStatus';
import Storage from 'service/types/Storage';
import StorageStatus from 'service/types/StorageStatus';

function randomChoice<T>(array: T[]) {
	return array[Math.floor(Math.random() * array.length)];
}

const operationStatusFor: Record<StorageStatus, OperationStatus> = {
	[StorageStatus.NoChanges]: OperationStatus.NoChanges,
	[StorageStatus.Success]: OperationStatus.Success,
	[StorageStatus.UnkownError]: OperationStatus.UnexpectedError,
};

export default function createStorageService(storage: Storage): Service {
	return {
		getArticleByName(name: string) {
			return storage.getArticleByName(name);
		},

		async getRandomArticle() {
			const articles = await storage.getAllArticles();
			return randomChoice(articles);
		},

		async markArticleAsRead(name: string) {
			const article = await storage.getArticleByName(name);
			if (!article) {
				return OperationStatus.InvalidArticleName;
			}

			try {
				const storageStatus = await storage.setArticleRead(article);
				return operationStatusFor[storageStatus];
			} catch (e) {
				return OperationStatus.UnexpectedError;
			}
		},

		async markArticleAsUnread(name: string) {
			const article = await storage.getArticleByName(name);
			if (!article) {
				return OperationStatus.InvalidArticleName;
			}

			try {
				const storageStatus = await storage.setArticleUnread(article);
				return operationStatusFor[storageStatus];
			} catch (e) {
				return OperationStatus.UnexpectedError;
			}
		},

	};
}