import ArticleDto from './ArticleDto';
import OperationStatus from './OperationStatus';

export default interface Service {
    getRandomArticle(): Awaitable<ArticleDto>;
    getArticleByName(name: string): Awaitable<ArticleDto | null>;
    markArticleAsRead(name: string): Awaitable<OperationStatus>;
    markArticleAsUnread(name: string): Awaitable<OperationStatus>;
}