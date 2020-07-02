import fs from 'fs';

export function serializeSet<T>(set: Set<T>): string {
	return JSON.stringify(Array.from(set));
}

function deserializeSet<T>(set: string): Set<T> {
	return new Set(JSON.parse(set));
}

export function readSet<T>(path: string): Set<T> {
	return deserializeSet(fs.readFileSync(path).toString());
}

export function readArray<T>(file: string): T[] {
	return JSON.parse(fs.readFileSync(file).toString());
}