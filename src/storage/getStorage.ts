import { createDummyStorage } from './implementations/dummy/Dummy';

export function getStorage() {
	return createDummyStorage() ;
}