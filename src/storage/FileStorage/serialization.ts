import fs, { promises as promiseFs } from 'fs';

function serializeSet<T>(set: Set<T>): string {
	return JSON.stringify([...set]);
}

function deserializeSet<T>(set: string): Set<T> {
	return new Set(JSON.parse(set));
}

export function readSetSync<T>(path: string): Set<T> {
	return deserializeSet(fs.readFileSync(path).toString());
}

export function readArraySync<T>(file: string): T[] {
	return JSON.parse(fs.readFileSync(file).toString());
}

export function writeSet<T>(path: string, set: Set<T>): Promise<void> {
	return promiseFs.writeFile(path, serializeSet(set));
}