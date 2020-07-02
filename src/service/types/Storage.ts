import Article from 'api/types/Article';
import StorageStatus from 'service/types/StorageStatus';

export default interface Storage {
    getArticleByName(name: string): Awaitable<Article | null>;
    getAllArticles(): Awaitable<Article[]>;
    setArticleRead(article: Article): Awaitable<StorageStatus>;
    setArticleUnread(article: Article): Awaitable<StorageStatus>;
}