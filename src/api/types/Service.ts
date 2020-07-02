import Article from './Article';
import OperationStatus from './OperationStatus';

export default interface Service {
    getRandomArticle(): Article;
    getArticleByName(name: string): Article | null;
    markArticleAsRead(name: string): OperationStatus;
    markArticleAsUnread(name: string): OperationStatus;
}