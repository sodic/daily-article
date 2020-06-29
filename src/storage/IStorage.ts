import { Article } from './Article';

export interface IStorage {
    getArticleByName(name: string): Article | null,
    getRandomArticle(): Article,
}