function swapKeysAndValues<T extends {}>(obj: T): {[K in keyof T as T[K]]: K} {
	const result: any = {}

	for (const [key, value] of Object.entries<string | number>(obj)) {
		result[value] = key
	}

	return result
}

const obj = {
	name: 'Aleksandr',
	age: 22,
	role: 'Admin'
} as const

const pickedObj = swapKeysAndValues(obj)

pickedObj.Admin