function pickObjectKeys<T extends {}, K extends keyof T>(obj: T, keys: Array<K>): {[key in typeof keys[number]]: T[key]} {
	const res = {} as {[key in typeof keys[number]]: T[key]}

	for (const key of keys) {
		res[key] = obj[key]
	}
	return res
}

const user = {
	name: "Vasiliy",
	age: 8,
	skills: ["TS", "JS"]
}

const res = pickObjectKeys(user, ['age', 'skills']);

