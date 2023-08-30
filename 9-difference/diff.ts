const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

function exclude<T extends object, K extends object> (a: T,b: K):  Pick<T, Exclude<keyof T, keyof K>> {
	const bKeys = getKeys(b);
	const aKeys = getKeys(a);
	const finalKeys = aKeys.filter(key => !bKeys.includes(key))

	const result = {} as T
	for (const key of finalKeys) {
		result[key] = a[key]
	}

	return result;
}

interface IA {
	a: number;
	b: string;
}

interface IB {
	a: number;
	c: boolean;
}

interface IDiff {
	b: string;
}

let a: IA = { a: 5, b: '' };
let b: IB = { a: 10, c: true };

const ab: IDiff = exclude(a, b);