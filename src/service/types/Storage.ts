import ArticleModel from 'service/types/ArticleModel';
import StorageStatus from 'service/types/StorageStatus';

export default interface Storage {
    getArticleByName(name: string): Awaitable<ArticleModel | null>;
    getAllArticles(): Awaitable<ArticleModel[]>;
    setArticleRead(article: ArticleModel): Awaitable<StorageStatus>;
    setArticleUnread(article: ArticleModel): Awaitable<StorageStatus>;
}