import Article from 'api/types/Article';
import StorageStatus from 'service/types/StorageStatus';

export default interface IStorage {
    getArticleByName(name: string): Article | null;
    getAllArticles(): Article[];
    setArticleRead(article: Article): StorageStatus;
    setArticleUnread(article: Article): StorageStatus;
}