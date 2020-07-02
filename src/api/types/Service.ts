import Article from './Article';
import OperationStatus from './OperationStatus';

export default interface Service {
    getRandomArticle(): Awaitable<Article>;
    getArticleByName(name: string): Awaitable<Article | null>;
    markArticleAsRead(name: string): Awaitable<OperationStatus>;
    markArticleAsUnread(name: string): Awaitable<OperationStatus>;
}