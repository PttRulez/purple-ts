declare module 'sort-by' {
	export default function sortBy<T = number> (...args: string[]): (a: T, b: T) => number;
}