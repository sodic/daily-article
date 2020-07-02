import Storage from 'service/types/Storage';
import FileStorage from './FileStorage';

export function getStorage(): Storage {
	return new FileStorage('resources/articles.json', 'resources/read.json');
}